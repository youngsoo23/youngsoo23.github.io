---
title: "KCB·NICE 실명인증 중복 요청을 막아 호출 비용을 줄인 회고"
summary: "실명인증 API 호출마다 비용이 드는 구조에서 중복 호출을 막은 방법과, 그 과정에서 놓쳤던 해싱 설계의 허점을 정리합니다."
publishDate: 2026-07-26
tags: ["Security", "Hashing", "Cost Optimization"]
draft: false
---

## 문제: 인증 API는 호출할 때마다 비용이 든다

KCB·NICE 실명인증은 외부 기관 API라 호출마다 비용이 발생하고, 외부 장애에도 영향을 받는 구조였습니다. 그런데 같은 사람이 재가입이나 재시도 등으로 반복해서 인증을 시도하는 경우가 있었고, 그때마다 다시 외부 기관을 호출하는 건 불필요한 비용이었습니다.

## 중복 요청 판별: (이름, 주민번호)를 키로

이름과 주민번호를 키로 삼아, 최초 인증이 성공하면 그 결과를 저장해두고 이후 동일한 키로 요청이 들어오면 KCB·NICE를 다시 호출하지 않고 기존 인증 결과를 재사용하도록 만들었습니다. 이 로직으로 인증 호출 비용을 약 40% 절감했습니다.

## 원문을 그대로 저장할 수는 없었다

주민번호는 개인정보보호법상 엄격하게 보호되는 정보라, 원문을 그대로 저장할 수는 없었습니다. 대신 SHA-256으로 해시해서 저장했습니다. 이 값은 복호화가 필요 없는 값 — "일치 여부만 확인하면 되는 값"이었기 때문에, 되돌릴 필요 없는 데이터엔 양방향 암호화보다 단방향 해시가 더 안전한 선택이라고 판단했습니다.

```java
public class SHA256HashingUtils {

    @SneakyThrows
    public static String createSHA256Hash(String input) {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
        return DatatypeConverter.printHexBinary(hash).toLowerCase();
    }
}
```

## 돌아보니 놓친 것: salt/키 없는 해시의 허점

주민번호는 생년월일 6자리, 성별코드 1자리, 지역·일련번호 6자리로 형식이 제한적입니다. 가능한 조합의 수가 유한하다는 뜻입니다. 위 코드처럼 salt나 키 없이 `SHA256(이름+주민번호)`만 계산하면, 가능한 조합을 전부 미리 해시로 돌려 만든 표(레인보우 테이블) 하나로 원문을 알아낼 수 있는 구조였습니다.

여기서 정확히 짚어야 할 건 — 이게 "복호화"는 아니라는 점입니다. SHA-256은 애초에 역연산이 존재하지 않는 단방향 함수입니다. 공격자가 하는 건 가능한 입력을 하나씩 해시로 돌려서 유출된 값과 비교하는 **무차별 대입**이고, 이게 가능한 이유는 SHA-256이 약해서가 아니라 주민번호의 경우의 수가 현실적으로 다 시도해볼 수 있을 만큼 적기 때문입니다.

## 개선 방향: HMAC-SHA256(pepper)

일반적인 해법은 레코드마다 다른 랜덤 salt를 붙이는 것이지만, 이 케이스엔 맞지 않았습니다. 중복 판별이 동작하려면 같은 사람은 항상 같은 해시값이 나와야 하는데, 레코드마다 salt가 다르면 같은 사람도 매번 다른 값이 나와서 비교 자체가 불가능해지기 때문입니다.

그래서 필요한 건 값은 고정이지만 비밀로 보관하는 **HMAC 키(pepper)** 방식입니다.

```java
public class SHA256HashingUtils {

    private static final String HMAC_ALGORITHM = "HmacSHA256";
    // 소스코드에 하드코딩하지 않고 환경변수·Secret Manager·KMS에서 주입받는다
    private static final String SECRET_KEY = System.getenv("AUTH_HASH_SECRET_KEY");

    @SneakyThrows
    public static String createHmacSHA256Hash(String input) {
        Mac mac = Mac.getInstance(HMAC_ALGORITHM);
        SecretKeySpec secretKeySpec =
                new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
        mac.init(secretKeySpec);

        byte[] hash = mac.doFinal(input.getBytes(StandardCharsets.UTF_8));
        return DatatypeConverter.printHexBinary(hash).toLowerCase();
    }
}
```

같은 입력이면 여전히 같은 결과가 나와서 중복 판별은 그대로 동작하고, 공격자가 DB를 통째로 훔쳐도 `SECRET_KEY`가 없으면 대입 계산 자체를 할 수 없습니다. DB 유출만으로는 뚫리지 않고, 별도로 보관된 비밀키까지 함께 털려야 하는 방어선이 하나 더 생기는 셈입니다.

## 마무리

기능은 의도한 대로 동작했고 비용도 실제로 줄었지만, "동작하는 기능을 만드는 것"과 "그 기능이 다루는 데이터의 위협 모델까지 고려하는 것"은 다른 차원의 일이라는 걸 되짚게 된 케이스였습니다. 지금 다시 만든다면 처음부터 HMAC 기반으로 설계할 것 같습니다.
