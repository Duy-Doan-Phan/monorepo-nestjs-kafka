import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class TransformQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    // Kiểm tra xem giá trị đầu vào có phải là IRunQuery không
    if (metadata.type === 'body') {
      const query: string = value.q
      const params: unknown[] = value.p || ''

      // Chuyển đổi query từ dạng string '' thành dạng template literals ``
      const transformedQuery: string = this.transformQuery(query)

      // Trả về IRunQuery mới với query đã được chuyển đổi và params
      return { query: transformedQuery, params }
    }
    return value
  }

  private transformQuery(query: string): string {
    // Kiểm tra xem query có nằm trong dấu '' hay không
    if (
      (query?.startsWith("'") && query?.endsWith("'")) ||
      (query?.startsWith(`"`) && query?.endsWith(`"`))
    ) {
      // Loại bỏ dấu '' và chuyển thành template literals ``
      return `\`${query.slice(1, -1)}\``
    }
    return query // Trả về query nguyên bản nếu không phải dạng ''
  }
}
