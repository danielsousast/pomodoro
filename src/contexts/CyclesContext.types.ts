import * as zod from 'zod'
import { newCycleFormSchema } from '../pages/Home/Home.validator'

export type NewCycleFormData = zod.infer<typeof newCycleFormSchema>
