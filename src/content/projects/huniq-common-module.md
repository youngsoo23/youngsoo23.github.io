---
title: "두 서비스에서 반복되던 구현을 공통 모듈로 통합"
summary: "Zelotek 2.0과 Banny, 두 서비스에서 각각 구현되던 공통 유틸·에러 핸들링을 하나의 모듈로 통합했습니다."
company: "주식회사 휴니크"
period: "2021.08 – 2022.10"
tags: ["Java 17", "Spring Boot 2.x", "JPA", "QueryDSL", "MySQL"]
featured: false
type: "case"
order: 11
---

## 문제

Zelotek 2.0과 Banny 두 서비스에서 공통 유틸·응답 스키마·에러 핸들링이 각각 따로 구현되고 있었습니다.

## 해결

공통 모듈 구조를 설계해 두 서비스가 함께 공유하도록 만들었습니다.

## 결과

도메인 규약 관리와 협업 효율이 개선되었습니다.
