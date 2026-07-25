---
title: "서비스 간 뒤섞인 공통 코드를 Gradle 멀티모듈로 정리"
summary: "여러 서비스에서 공통 로직과 도메인 경계가 뒤섞여 있던 문제를 멀티모듈 구조로 정리했습니다."
company: "게임스카우트"
period: "2022.09 – 2023.02"
tags: ["Java 17", "Spring Boot 2.x", "JPA", "QueryDSL", "MySQL", "Gradle"]
featured: false
type: "case"
order: 10
---

## 문제

게임 채용 플랫폼과 관리자 백오피스, 두 서비스에서 공통 로직과 도메인 경계가 뒤섞여 있었습니다.

## 해결

Gradle 멀티모듈 구조를 적용해 공통 코드를 별도 모듈로 분리했습니다.

## 결과

코드 일관성과 유지보수 용이성이 높아졌습니다.
