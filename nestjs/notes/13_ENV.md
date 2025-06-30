
# Environment Variables (for practical implementation , check ev services and ev controller )
- Environment variables are used to store values that change depending on the environment ( development , production , testing) like database URLs, API keys, secrets, etc. 

### Why to use
- Secure sensitive info like passwords or API keys
- Easily switch between dev/staging/prod environments
- Keep codebase clean and configurable

#### install package **@nestjs/config ** 
- This package will set the configuration of our environment 
- configure this in app.module in imports section by **ConfigModule.forRoot({isGlobal: true})**
