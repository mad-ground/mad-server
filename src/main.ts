import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//얘는 원래 있어야함

import cookieParser = require('cookie-parser');
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { jwtConstants } from './constants';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //NestJS 어플리케이션 생성

  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  //SwaggerCustomOptions를 사용하여 Swagger UI를 사용자 정의
  //Swagger UI에서 한 번 인증을 수행하면, 이후에 보내는 모든 요청에도 같은 인증 정보가 유지
  //Swagger -> API 문서 자동 생성, API의 개발, 테스트 및 문서화를 돕는 오픈 소스 프레임워크

  app.use(cookieParser(jwtConstants.secret));
  //cookieParser -> HTTP 요청에서 쿠키 파싱, 사용. 클라이언트가 서버로 보내는 HTTP 요청 헤더에 포함된 쿠키 데이터 추출, 사용하기 쉬운 형태로 변환

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .addTag('nestjs')
    .build();
  //Swagger 문서 구성 설정

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, config),
    options,
  );
  //SwaggerModule을 사용하여 API 문서를 설정하고 등록

  await app.listen(80);
  // 애플리케이션을 80번 포트로 시작

}
bootstrap();
