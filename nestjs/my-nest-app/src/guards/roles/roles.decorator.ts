import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles'; // we are making a key roles so that i can take multiple values inside it . Can be normal user, moderator , admin or any .So need to make key - value pair for this where key is roles

// making decorator:- The job of this decorator will be to accept multiple values within this key. And that mulitple values will be accepted using SetMetadata
// So the setMetadata function is to inject multiple values inside decorator
// Roles is basically our custom decorator
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY,roles)   // setmetadata take a key value pair. so key we already defined above ROLES_KEY . value is roles like normal user, moderator, admin

// now we use this decorator inside our controller
