import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';


@Injectable()
export class Cloudinary {
//     provide: CLOUDINARY,
//   useFactory: (): void => {
//     return v2.config({
//       cloud_name: 'Your cloud name',
//       api_key: 'Your api key',
//       api_secret: 'Your api secret',
//     });
//   },
}
