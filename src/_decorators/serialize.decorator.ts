import { ClassType } from "src/_types/types";
import {UseInterceptors} from '@nestjs/common'
import SerializeInterceptor from '../_interceptors/serialize.interceptor'
export default function Serialize(dto:ClassType<any>) {
    return UseInterceptors(new SerializeInterceptor(dto))
}