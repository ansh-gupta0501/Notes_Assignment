
# Lifecycle Events in NestJS / Special Methods In NestJS / Lifecycle Methods/ Hooks  (for practical implementation check database service )

- Lifecycle Events are special methods/hooks provided by NestJS
- Automatically called at different stages of a module/service/component's life. 
- Used to perform actions during creation or destruction 
- We need these methods when any specific event occured 
- NestJS calls them based on method name, even if interfaces aren't implemented — though using interfaces is recommended.

### Why useful
- Helps run some code when app/module/service is initialized.
- Helps run cleanup code when app/module/service is destroyed 
- Useful for tasks like DB connections, logging,resource cleanup, etc. 

### When are they triggered?
- onModuleInit() -> Called when the module is initialized -> 	Called once when the provider is initialized within a module
- onModuleDestroy() -> Called before the module is destroyed -> 	Called just before the provider is destroyed (e.g., during shutdown)
- afterModuleInit()(optional) -> Called after all modules are initialized
- onApplicationBootstrap() -> When app is fully bootstrapped -> Called after all modules are initialized and the app is fully bootstrapped
- OnApplicationShutdown() -> Called when app is shutting down. -> Called before onApplicationShutdown, used for ordered cleanup

### 🔄 Lifecycle Execution Order (Typical)
App Starts →
  onModuleInit() (per provider)
  onApplicationBootstrap() (after all modules/providers initialized)

App Shuts Down →
  beforeApplicationShutdown(signal)
  onApplicationShutdown(signal)
  onModuleDestroy() (per provider)


