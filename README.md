# Front-end

# :mailbox_with_mail: [Spreet] 힙합 문화 콘텐츠 공유 플랫폼

## :house_with_garden: 소개 | About Us

<img width="960" alt="Spreet 오프닝 사진" src="https://files.slack.com/files-pri/T01L2TNGW3T-F04NFBK98DP/1.png">

---

## :tada: 서비스 소개

### 🛹: Spreet은 “힙합“과 관련된 컨텐츠를 쉽게 접할 수 있습니다.

#### 🛹: 힙합과 관련된 아티스트라면 크루 회원가입을 통해 승인을 받고 행사를 홍보할 수 있어요.

#### 🛹: 힙합영상이나 사진 게시글을 자유롭게 공유할 수 있어요.

#### 🛹: 힙합이라는 주제로 다양한 힙합 문화를 공유해 보세요!

---

## 📜목차

[1. 전체 프로젝트 개발기간 | Project Period](#-전체-프로젝트-개발기간--project-period)  
[2. 아키텍쳐](#아키텍쳐)  
[3. 기술정보](#기술정보)  
[4. 기술적 의사결정](#기술적-의사결정)  
[5. 주요 기능](#주요-기능)  
[6. 트러블슈팅](#트러블슈팅)  
[7. 팀원 소개](#팀원-소개)

---

## :calendar: 전체 프로젝트 개발기간 | Project Period

:pushpin: 2022. 12.30 ~ 2022. 2.3

---

## :nut_and_bolt: 아키텍쳐

![아키텍쳐](https://www.notion.so/Spreet-b6601fb63c764ec58a91570dabfd07cb#2dca6edacfbb495da272c791d228574e)

---

## :earth_asia: 기술정보

![React](https://img.shields.io/badge/react-67DCF7?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![CreateReactApp](https://img.shields.io/badge/createreactapp-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white)
![ReactRouter](https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![YARN](https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![ReactQuery](https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![AmazonCloudFront](https://img.shields.io/badge/AmazonCloudFront-DF5146?style=for-the-badge&logo=amazoncloudfront&logoColor=white)
![Route53](https://img.shields.io/badge/Route53-F58340?style=for-the-badge&logo=route53&logoColor=white)
![SpringBoot](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![AmazonRDS](https://img.shields.io/badge/amazonRDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![AmazonEC2](https://img.shields.io/badge/amazonEC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![amazonS3](https://img.shields.io/badge/amazonS3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![AWSLambda](https://img.shields.io/badge/AWSLambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white)
![LoadBalancer](https://img.shields.io/badge/LoadBalancer-F48340?style=for-the-badge&logo=loadbalancer&logoColor=white)
![ElasticBeanstalk](https://img.shields.io/badge/ElasticBeanstalk-924F29?style=for-the-badge&logo=elasticbeanstalk&logoColor=white)
![GitHubActions](https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

---

## :wrench: 기술적 의사결정

| 사용기술                    | 기술설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CloudFront                  | 사용자에게 제공되는 정적 컨텐츠의 전송 속도를 높이고 HTTPS를 적용시키기 위해 사용되었다.                                                                                                                                                                                                                                                                                                                                                                                                  |
| 카카오 지도/주소 API        | 매물 상담과 발품 기록의 주소를 단순 텍스트로 기입하는 것이 아닌, API를 활용하여 정확한 주소와 지도상의 위치를 표기하기 위해 사용하였다.                                                                                                                                                                                                                                                                                                                                                   |
| Amazon RDS                  | db에 저장하는 데이터들을 정형화하고 테이블 간 관계를 중점적으로 보기 위해 사용했다.                                                                                                                                                                                                                                                                                                                                                                                                       |
| elastic beanstalk           | elastic beanstalk을 사용하면 각 인프라에 대해 자세히 알지 못해도 AWS 클라우드에서 애플리케이션을 신속하게 배포하고 관리할 수 있다. 우리 서비스 같은 경우 RDS(mysql), Elasticache(redis), load balancer, auto scaling, cloud watch, lambda 등 aws의 여러 서비스를 사용해서 아키텍처를 구성할 예정이다. 각 서비스별 복잡한 설정 과정을 건너뛰고 손쉽게 연동하고 서버를 배포할 수 있기 때문에 사용하기로 결정했다                                                                            |
| load balancer, Auto Scaling | Auto Scaling을 사용하면 트래픽이 과도하게 많아질 때 서버를 자동으로 증설해준다. 병목 지점에 도달했을 때 ELB를 사용하면 접근을 여러 대의 EC2 인스턴스로 분산할 수 있다. 인스턴스를 분산함으로써 부하를 분산할 수 있다. 또한 1대의 인스턴스에 에러가 발생해도 다른 인스턴스에서 트래픽을 처리할 수 있기 때문에 가용성이 보장되고 예기치 않은 트래픽 증가에 대비하기 위해서 적용하게 되었다.                                                                                                 |
| queryDsl                    | HQL(Hibernate Query Language) 쿼리를 타입에 안전한 방식으로 실행하기 위해 사용한다. HQL 쿼리를 작성하다보면 String 연결을 이용하게 되고, 결과적으로 읽기 어려운 코드를 만든다. String을 이용해서 도메인 타입과 프로퍼티를 참조하다 보면 오타 등으로 잘못된 참조를 할 수 있다. 도메인 변경이 직접적으로 쿼리에 반영되고 쿼리 작성과정에서 코드 자동완성을 사용함으로써 더 빠르고 안전하게 만들 수 있기 때문에 사용하기로 결정했다.                                                         |
| lambda                      | • 이미지 리사이징 목적 : 우리 서비스 같은 경우에 각 매물당 최대 30장의 이미지가 들어갈 수 있다. 원본 크기의 이미지를 그대로 불러오게 되면 고화질 이미지일수록 이미지 처리 속도가 길어지게 된다. 또한 이미지 생성과 삭제가 많아질수록 이미지 작업에 따른 비용도 늘어난다. 고화질 사진을 썸네일에 그대로 사용할 경우 화질이 깨지는 현상이 발생한다. 따라서 사용자가 S3에 업로드한 사진을 썸네일 크기에 맞춰 리사이징하면 화질이 깨지는 현상이 해결되고, 이미지 작업에 따른 비용이 감소된다. |
| github action               | 짧은 개발 기간상 템플릿이 많고 환경 구축이 쉬운 시스템을 사용하는 게 맞다고 생각했다. 일반적으로 많이 사용되는 CI/CD 서비스인 Jenkins와 github action을 두고 봤을때, github action은 별도의 서버 설치가 필요 없고 github 마켓 플레이스를 통해 workflow 정보를 쉽게 확인할 수 있으므로 비교적 Jenkins에 비해 처음 CI/CD를 구축하는 사람 입장에서 접근하고 환경 구축하기가 쉽다고 판단했다.                                                                                                 |

---

## :crossed_swords: 주요 기능

- 영상(쇼츠) 게시글, 사진(피드) 게시글을 공유할 수 있습니다.
- 아티스트라면 위치정보를 기입하여 행사 게시글을 작성할 수 있어요.
- 유저는 행사 정보를 맵을 통해 확인하고 행사장까지 길찾기를 할 수 있습니다.
- 게시글의 구독 기능을 통해 해당 유저나 아티스트의 새로운 게시글 알람을 받을 수 있어요.:종:

---

## :sparkler: 트러블슈팅

<details>
   ### [Spreet 노션](https://www.notion.so/Troubleshooting-_FE-ae0b2dbd5caf459f9d40df3c975c28b2) 
</details>
----

## :flamingo: 팀원 소개

| 나준영   | 오채운 | 김규민     | 김소라 | 이승열   | 임성신 |
| -------- | ------ | ---------- | ------ | -------- | ------ |
| FE(팀장) | FE     | BE(부팀장) | BE     | Designer |
