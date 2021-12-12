import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from './types';

// bearer 410fn198hadaih081flsnh

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
   const authorization = context.req.headers['authorization'];

   if (!authorization) throw new Error('Not authenticated');

   try {
      const token = authorization!.split(' ')[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
   } catch (error) {
      console.log(error);
      throw new Error('Not authenticated');
   }

   return next();
};
