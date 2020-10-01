import { makeAddArticleValidation } from './add-article-validation-factory'
import { ValidationComposite } from '../../../../../validations/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

jest.mock('../../../../../validations/validators/validation-composite')

describe('AddArticleValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddArticleValidation()
    const validations: Validation[] = []
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
