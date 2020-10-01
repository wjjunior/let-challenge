import { ValidationComposite } from '../../../../../validations/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddArticleValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  return new ValidationComposite(validations)
}
