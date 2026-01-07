import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface User {
  email: string;
}

export const User = createParamDecorator((_, ctx: ExecutionContext): User => {
  const user = ctx.switchToHttp().getRequest().user;
  return user as User;
})
