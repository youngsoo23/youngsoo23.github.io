---
title: "Global MVP — Stripe·해외 보험사 API 연동, 2개월 내 런칭"
summary: "Stripe 결제와 Starr 보험사 API를 연동한 해외 신규 플랫폼을 MSA 대신 MVP로 빠르게 검증했습니다."
company: "오픈플랜주식회사"
period: "2025.05 – 2025.09"
tags: ["Java 21", "Spring Boot 3.3.x", "JPA", "RestClient", "Redis", "Docker", "Stripe API", "Starr API", "MySQL"]
featured: true
type: "flagship"
order: 2
---

## 배경

Stripe 결제와 Starr 보험사 API 연동을 중심으로 한 신규 해외(싱가포르) 여행자보험 플랫폼이었습니다.

## 문제

MSA 구조로 설계하는 방안도 검토했지만, 해외 시장 반응을 빠르게 검증해야 하는 상황이었습니다.

## 담당 범위

데이터 모델 설계와 Spring Boot 기반 API 서버 구축을 담당했습니다.

## 기술적 판단과 해결 방법

- **MVP 우선.** MSA 대신 MVP 구조를 선택해 약 2개월 내 개발·런칭을 완료했습니다.
- **Idempotency key 기반 요청 제어.** Stripe PaymentIntent와 Starr API(견적 → 심사 → 증권 발급) 통합 과정에서 idempotency key와 Webhook 비동기 검증 로직을 직접 설계해 중복 결제와 데이터 불일치를 방지했습니다.
- **Redis Cache-Aside.** 국가·상품 조회 API의 DB 반복 호출을 캐싱으로 없앴습니다.

## 결과와 배운 점

동일 조건 기준 응답 지연을 약 30% 개선했고, Slack Webhook 기반 장애 사전 탐지 체계로 운영팀이 문제 발생 직후 대응할 수 있게 되었습니다. 빠른 검증이 필요한 상황에서는 이상적인 아키텍처보다 실용적인 선택이 더 중요하다는 걸 경험했습니다.
