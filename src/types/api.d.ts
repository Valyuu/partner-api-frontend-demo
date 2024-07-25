declare namespace Components {
  namespace Schemas {
    export interface PartnerV1CreateTradeInBankAccountInput {
      /**
       * Name of the account holder
       */
      holderName?: string
      /**
       * Bank account number
       */
      accountNumber: string
    }
    export interface PartnerV1CreateTradeInInput {
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
      /**
       * Email of the seller
       */
      email: string
      /**
       * Date of birth of the seller in the format YYYY-MM-DD
       */
      dateOfBirth: string
      /**
       * Shipping address of the seller
       */
      shippingAddress: {
        /**
         * First name of the recipient
         */
        firstName: string
        /**
         * Last name of the recipient
         */
        lastName: string
        /**
         * Country of the recipient
         */
        country: string
        /**
         * Postal code of the recipient
         */
        postalCode: string
        /**
         * House number of the recipient
         */
        houseNumber: string
        /**
         * Additional address information
         */
        addition?: string
        /**
         * Street name of the recipient
         */
        street: string
        /**
         * City of the recipient
         */
        city: string
        /**
         * Country code of the recipient, for example +31
         */
        phoneAreaCode: string
        /**
         * Pure number format of the recipient's phone number, without letters or separators
         */
        phoneNumber: string
      }
      /**
       * List of items to be sold
       */
      items: PartnerV1CreateTradeInItemInput[]
      /**
       * Payment type, defaults to BANK_TRANSFER
       */
      paymentType?: 'BANK_TRANSFER' | 'DONATION' | 'PARTNER_WEBHOOK'
      /**
       * Bank account information of the seller. Only required if paymentType is set to BANK_TRANSFER
       */
      bankAccount?: {
        /**
         * Name of the account holder
         */
        holderName?: string
        /**
         * Bank account number
         */
        accountNumber: string
      }
      /**
       * If it's set to true, Valyuu will send the seller an email. Defaults to false
       */
      sendCustomerEmail?: boolean
    }
    export interface PartnerV1CreateTradeInItemInput {
      /**
       * Unique identifier for the variant
       */
      variantId: string // uuid
      /**
       * Price of the item
       */
      price: number
      /**
       * Indicates if the product is functional
       */
      isProductFunctional: boolean
      /**
       * Conditions of the product if functional
       */
      conditions: PartnerV1GetVariantPriceConditionItemInput[]
      /**
       * Problems of the product if not functional
       */
      problems: string /* uuid */[]
    }
    export interface PartnerV1CreateTradeInOutput {
      /**
       * Unique identifier for the trade-in
       */
      tradeInId: string // uuid
      /**
       * Human readable order number associated with the trade-in
       */
      tradeInOrderNumber: string
      /**
       * URL for the shippinglabel PDF
       */
      shippingLabel: string
    }
    export interface PartnerV1CreateTradeInShippingAddressInput {
      /**
       * First name of the recipient
       */
      firstName: string
      /**
       * Last name of the recipient
       */
      lastName: string
      /**
       * Country of the recipient
       */
      country: string
      /**
       * Postal code of the recipient
       */
      postalCode: string
      /**
       * House number of the recipient
       */
      houseNumber: string
      /**
       * Additional address information
       */
      addition?: string
      /**
       * Street name of the recipient
       */
      street: string
      /**
       * City of the recipient
       */
      city: string
      /**
       * Country code of the recipient, for example +31
       */
      phoneAreaCode: string
      /**
       * Pure number format of the recipient's phone number, without letters or separators
       */
      phoneNumber: string
    }
    export interface PartnerV1GetBrandsInput {
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
      /**
       * Category ID to filter brands
       */
      categoryId: string
    }
    export interface PartnerV1GetBrandsItemOutput {
      /**
       * Unique identifier for the brand
       */
      id: string // uuid
      /**
       * Name of the brand
       */
      name: string
      /**
       * Image URL for the brand
       */
      image: string
    }
    export interface PartnerV1GetCategoriesInput {
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
    }
    export interface PartnerV1GetCategoriesItemOutput {
      /**
       * Unique identifier for the category
       */
      id: string // uuid
      /**
       * Name of the category
       */
      name: string
      /**
       * URL of the category icon
       */
      icon: string
      /**
       * URL of the category image
       */
      image: string
    }
    export interface PartnerV1GetGeneralQuestionsOutput {
      /**
       * Name of the model
       */
      name: string
      /**
       * Image URL for the model
       */
      image: string
      /**
       * Indicates if the model is eligible for trade-in
       */
      isEligibleForTradeIn: boolean
      /**
       * Attribute questions for the model
       */
      attributeQuestions: PartnerV1GetQuestionsItemAttributeQuestionsItemOutput[]
      /**
       * Attribute combinations for the model
       */
      attributeCombinations: PartnerV1GetQuestionsItemAttributeCombinationsItemOutput[]
      /**
       * Guidance questions for the model
       */
      guidanceQuestions: PartnerV1GetQuestionsItemGuidanceQuestionsItemOutput[]
    }
    export interface PartnerV1GetModelsInput {
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
      /**
       * Category ID to filter models
       */
      categoryId: string
      /**
       * Brand ID to filter models
       */
      brandId?: string
      /**
       * Flag to only show eligible models, which means that unavailable items will be hidden. Defaults to false
       */
      onlyShowEligible?: boolean
    }
    export interface PartnerV1GetModelsItemOutput {
      /**
       * Unique identifier for the model
       */
      id: string // uuid
      /**
       * Name of the model
       */
      name: string
      /**
       * Image URL for the model
       */
      image: string
    }
    export interface PartnerV1GetQuestionsInput {
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
      /**
       * Model ID to filter questions
       */
      modelId: string
    }
    export interface PartnerV1GetQuestionsItemAttributeCombinationsItemChoicesItemOutput {
      /**
       * Unique identifier for the attribute
       */
      attributeId: string // uuid
      /**
       * Unique identifier for the option
       */
      optionId: string // uuid
    }
    export interface PartnerV1GetQuestionsItemAttributeCombinationsItemOutput {
      /**
       * Unique identifier for the combination
       */
      id: string // uuid
      /**
       * Unique identifier for the variant
       */
      variantId: string // uuid
      /**
       * Choices for the attribute combination
       */
      choices: PartnerV1GetQuestionsItemAttributeCombinationsItemChoicesItemOutput[]
    }
    export interface PartnerV1GetQuestionsItemAttributeQuestionsItemOptionItemOutput {
      /**
       * Unique identifier for the option
       */
      id: string // uuid
      /**
       * Name of the option
       */
      name: string
    }
    export interface PartnerV1GetQuestionsItemAttributeQuestionsItemOutput {
      /**
       * Unique identifier for the attribute question
       */
      id: string // uuid
      /**
       * Name of the attribute question
       */
      name: string
      /**
       * Question text
       */
      question: string
      /**
       * Description of the attribute question
       */
      description?: string
      /**
       * Options for the attribute question
       */
      options: PartnerV1GetQuestionsItemAttributeQuestionsItemOptionItemOutput[]
    }
    export interface PartnerV1GetQuestionsItemConditionQuestionsItemOptionsItemOutput {
      /**
       * Unique identifier for the option
       */
      id: string // uuid
      /**
       * Name of the option
       */
      name: string
      /**
       * Description of the option
       */
      description: string
    }
    export interface PartnerV1GetQuestionsItemConditionQuestionsItemOutput {
      /**
       * Unique identifier for the condition question
       */
      id: string // uuid
      /**
       * Name of the condition question
       */
      name: string
      /**
       * Question text
       */
      question: string
      /**
       * Description of the condition question
       */
      description?: string
      /**
       * Options for the condition question
       */
      options: PartnerV1GetQuestionsItemConditionQuestionsItemOptionsItemOutput[]
    }
    export interface PartnerV1GetQuestionsItemGuidanceQuestionsItemImageTextItemOutput {
      /**
       * Unique identifier for the image text
       */
      id: string // uuid
      /**
       * Name of the image text
       */
      name: string
      /**
       * URL of the image
       */
      image: string
    }
    export interface PartnerV1GetQuestionsItemGuidanceQuestionsItemOutput {
      /**
       * Unique identifier for the guidance question
       */
      name: string // uuid
      /**
       * Question text
       */
      question: string
      /**
       * Description of the guidance question
       */
      description?: string
      /**
       * Image texts for the guidance question
       */
      imageTexts: PartnerV1GetQuestionsItemGuidanceQuestionsItemImageTextItemOutput[]
    }
    export interface PartnerV1GetQuestionsItemProblemQuestionsItemOutput {
      /**
       * Unique identifier for the problem question
       */
      id: string // uuid
      /**
       * Name of the problem question
       */
      name: string
    }
    export interface PartnerV1GetVariantPriceConditionItemInput {
      /**
       * Unique identifier for the condition
       */
      conditionId: string // uuid
      /**
       * Unique identifier for the option
       */
      optionId: string // uuid
    }
    export interface PartnerV1GetVariantPriceInput {
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
      /**
       * Unique identifier for the variant
       */
      variantId: string // uuid
      /**
       * Indicates if the product is functional
       */
      isProductFunctional: boolean
      /**
       * Conditions of the product if functional
       */
      conditions: PartnerV1GetVariantPriceConditionItemInput[]
      /**
       * Problems of the product if not functional
       */
      problems: string /* uuid */[]
    }
    export interface PartnerV1GetVariantPriceOutput {
      /**
       * Product model name
       */
      name: string
      /**
       * Product model image
       */
      image: string
      /**
       * Product model attributes
       */
      attributes: string[]
      /**
       * User's answers
       */
      answers: string[]
      /**
       * Currency of the price
       */
      currency: string
      /**
       * Trade-in price in pure number format
       */
      price: number
    }
    export interface WrappedPartnerV1CreateTradeInOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * Trade-in output
       */
      data: {
        /**
         * Unique identifier for the trade-in
         */
        tradeInId: string // uuid
        /**
         * Human readable order number associated with the trade-in
         */
        tradeInOrderNumber: string
        /**
         * URL for the shippinglabel PDF
         */
        shippingLabel: string
      }
    }
    export interface WrappedPartnerV1GetBrandsOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * Brand list
       */
      data: PartnerV1GetBrandsItemOutput[]
    }
    export interface WrappedPartnerV1GetCategoriesOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * Category list
       */
      data: PartnerV1GetCategoriesItemOutput[]
    }
    export interface WrappedPartnerV1GetConditionQuestionsOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * Condition questions for the model
       */
      data: PartnerV1GetQuestionsItemConditionQuestionsItemOutput[]
    }
    export interface WrappedPartnerV1GetGeneralQuestionsOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * General questions for the model
       */
      data: {
        /**
         * Name of the model
         */
        name: string
        /**
         * Image URL for the model
         */
        image: string
        /**
         * Indicates if the model is eligible for trade-in
         */
        isEligibleForTradeIn: boolean
        /**
         * Attribute questions for the model
         */
        attributeQuestions: PartnerV1GetQuestionsItemAttributeQuestionsItemOutput[]
        /**
         * Attribute combinations for the model
         */
        attributeCombinations: PartnerV1GetQuestionsItemAttributeCombinationsItemOutput[]
        /**
         * Guidance questions for the model
         */
        guidanceQuestions: PartnerV1GetQuestionsItemGuidanceQuestionsItemOutput[]
      }
    }
    export interface WrappedPartnerV1GetModelsOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * Model list
       */
      data: PartnerV1GetModelsItemOutput[]
    }
    export interface WrappedPartnerV1GetProblemQuestionsOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * Problem questions for the model
       */
      data: PartnerV1GetQuestionsItemProblemQuestionsItemOutput[]
    }
    export interface WrappedPartnerV1GetVariantPriceOutput {
      /**
       * Indicates the success of the operation
       */
      success: boolean
      /**
       * Error message if the operation fails
       */
      message?: string
      /**
       * HTTP status code of the operation
       */
      statusCode: number
      /**
       * Get variant price output
       */
      data: {
        /**
         * Product model name
         */
        name: string
        /**
         * Product model image
         */
        image: string
        /**
         * Product model attributes
         */
        attributes: string[]
        /**
         * User's answers
         */
        answers: string[]
        /**
         * Currency of the price
         */
        currency: string
        /**
         * Trade-in price in pure number format
         */
        price: number
      }
    }
  }
}
declare namespace Paths {
  namespace PartnerV1ControllerCreateTradeIn {
    export type RequestBody = Components.Schemas.PartnerV1CreateTradeInInput
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1CreateTradeInOutput
    }
  }
  namespace PartnerV1ControllerGetBrands {
    namespace Parameters {
      export type CategoryId = string
      export type Lang = 'en' | 'nl' | 'de'
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      categoryId: Parameters.CategoryId
    }
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1GetBrandsOutput
    }
  }
  namespace PartnerV1ControllerGetCategories {
    namespace Parameters {
      export type Lang = 'en' | 'nl' | 'de'
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
    }
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1GetCategoriesOutput
    }
  }
  namespace PartnerV1ControllerGetConditionQuestions {
    namespace Parameters {
      export type Lang = 'en' | 'nl' | 'de'
      export type ModelId = string
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      modelId: Parameters.ModelId
    }
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1GetConditionQuestionsOutput
    }
  }
  namespace PartnerV1ControllerGetModelQuestions {
    namespace Parameters {
      export type Lang = 'en' | 'nl' | 'de'
      export type ModelId = string
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      modelId: Parameters.ModelId
    }
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1GetGeneralQuestionsOutput
    }
  }
  namespace PartnerV1ControllerGetModels {
    namespace Parameters {
      export type BrandId = string
      export type CategoryId = string
      export type Lang = 'en' | 'nl' | 'de'
      export type OnlyShowEligible = boolean
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      categoryId: Parameters.CategoryId
      brandId?: Parameters.BrandId
      onlyShowEligible?: Parameters.OnlyShowEligible
    }
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1GetModelsOutput
    }
  }
  namespace PartnerV1ControllerGetProblemQuestions {
    namespace Parameters {
      export type Lang = 'en' | 'nl' | 'de'
      export type ModelId = string
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      modelId: Parameters.ModelId
    }
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1GetProblemQuestionsOutput
    }
  }
  namespace PartnerV1ControllerGetShippingLabel {
    namespace Parameters {
      export type TradeInId = string // uuid
    }
    export interface PathParameters {
      tradeInId: Parameters.TradeInId /* uuid */
    }
    namespace Responses {
      export interface $404 {}
      export interface $500 {}
    }
  }
  namespace PartnerV1ControllerGetVariantPrice {
    export type RequestBody = Components.Schemas.PartnerV1GetVariantPriceInput
    namespace Responses {
      export type $200 = Components.Schemas.WrappedPartnerV1GetVariantPriceOutput
    }
  }
}
