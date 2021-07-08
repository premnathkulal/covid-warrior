import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotImplementedException,
} from '@nestjs/common'
import { RegisterInput } from '../dto/register.dto'

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: RegisterInput, metadata: ArgumentMetadata) {
    let patterns = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,13}$/
    if (patterns.test(value.password)) {
      return value
    }
    throw new NotImplementedException('Invalid password pattern')
  }
}
