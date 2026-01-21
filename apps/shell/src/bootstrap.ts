import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { buildRoutes } from './app/build-routes';

async function bootstrap() {
  const routes = await buildRoutes();
  await bootstrapApplication(AppComponent, appConfig(routes));
}

bootstrap().catch((err) => console.error(err));
