// https://zod.dev/?id=basic-usage
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
// https://regex101.com/
// https://qiita.com/mpyw/items/886218e7b418dfed254b
import { z } from 'zod';
import { WorkBookType } from '$lib/types/workbook';

export const authSchema = z.object({
  username: z
    .string()
    .min(3, { message: '3文字以上入力してください' })
    .max(24, { message: '24文字になるまで削除してください' })
    .regex(/^[\w]*$/, { message: '半角英数字と_のみを利用してください' }),
  password: z
    .string()
    .min(8, { message: '8文字以上入力してください' })
    .max(128, { message: '128文字になるまで削除してください' })
    .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,128}$/, {
      message: '半角英文字(小・大)・数字をそれぞれ1文字以上含めてください',
    }),
});

const workBookTaskSchema = z.object({
  workBookId: z.number().nonnegative().optional(),
  taskId: z.string(),
  priority: z.number().positive(),
});

export const workBookSchema = z.object({
  userId: z.string(),
  title: z.string().min(3, { message: '3文字以上入力してください' }), // TODO: 文字数の上限を設ける。
  description: z
    .string()
    .min(0, { message: '' })
    .max(300, { message: '300文字になるまで削除してください' }),
  isPublished: z.boolean(),
  isOfficial: z.boolean(),
  workBookType: z.nativeEnum(WorkBookType),
  workBookTasks: z.array(workBookTaskSchema).min(1).max(200),
});
