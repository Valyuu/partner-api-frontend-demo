declare namespace Components {
  namespace Schemas {
    /**
     * Faq collection
     */
    export type FaqCollectionType = 'SELLER_PLAN' | 'SELLER_MAIN' | 'BUYER_MAIN'
    /**
     * The time unit for the payment time
     */
    export type PaymentTimeUnit = 'HOURS' | 'DAYS'
    /**
     * Payment type, defaults to BANK_TRANSFER
     */
    export type SalePaymentType = 'BANK_TRANSFER' | 'DONATION' | 'PARTNER_WEBHOOK'
    /**
     * Language code. Defaults to "nl"
     */
    export type SupportedLangues = 'en' | 'nl' | 'de'
    export interface V1CreateTradeInBankAccountInput {
      /**
       * Name of the account holder
       */
      holderName?: string
      /**
       * Bank account number
       */
      accountNumber: string
    }
    export interface V1CreateTradeInInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
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
      items: V1CreateTradeInItemInput[]
      paymentType?: /* Payment type, defaults to BANK_TRANSFER */ SalePaymentType
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
    export interface V1CreateTradeInItemInput {
      /**
       * Unique identifier for the variant
       */
      variantId: string // uuid
      /**
       * Price of the item
       */
      price: number
      /**
       * Plan of the item
       */
      plan: string
      /**
       * Indicates if the product is functional
       */
      isProductFunctional: boolean
      /**
       * Condition combination ID of the product if functional
       */
      conditionCombinationId?: string // uuid
      /**
       * Problem ids of the product if not functional
       */
      problemIds?: string /* uuid */[]
    }
    export interface V1CreateTradeInOutput {
      /**
       * Unique identifier for the trade-in
       */
      tradeInId: string // uuid
      /**
       * Unique identifier for the user
       */
      userId: string // uuid
      /**
       * Human readable order number associated with the trade-in
       */
      tradeInOrderNumber: string
      /**
       * URL for the shippinglabel PDF
       */
      shippingLabel: string
    }
    export interface V1CreateTradeInShippingAddressInput {
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
    export interface V1GetBrandsInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
      /**
       * Category ID to filter brands
       */
      categoryId?: string
    }
    export interface V1GetBrandsItemOutput {
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
    export interface V1GetCategoriesInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
    }
    export interface V1GetCategoriesItemOutput {
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
    export interface V1GetFaqsInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
      collection: /* Faq collection */ FaqCollectionType
    }
    export interface V1GetFaqsItemOutput {
      /**
       * Unique identifier for the FAQ
       */
      id: string // uuid
      /**
       * Faq question
       */
      question: string
      /**
       * Answer of the FAQ question
       */
      answer: string
    }
    export interface V1GetModelQuestionsAttributeCombinationsChoicesItemOutput {
      /**
       * Unique identifier for the attribute
       */
      attributeId: string // uuid
      /**
       * Unique identifier for the option
       */
      optionId: string // uuid
    }
    export interface V1GetModelQuestionsAttributeCombinationsItemOutput {
      /**
       * Unique identifier for the combination
       */
      id: string // uuid
      /**
       * Choices for the attribute combination
       */
      choices: V1GetModelQuestionsAttributeCombinationsChoicesItemOutput[]
    }
    export interface V1GetModelQuestionsAttributeQuestionsItemOutput {
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
      options: V1GetModelQuestionsAttributeQuestionsOptionItemOutput[]
    }
    export interface V1GetModelQuestionsAttributeQuestionsOptionItemOutput {
      /**
       * Unique identifier for the option
       */
      id: string // uuid
      /**
       * Name of the option
       */
      name: string
    }
    export interface V1GetModelQuestionsConditionQuestionsItemOutput {
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
      options: V1GetModelQuestionsConditionQuestionsOptionsItemOutput[]
    }
    export interface V1GetModelQuestionsConditionQuestionsOptionsItemOutput {
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
      /**
       * Percentage of users who chose this option
       */
      percentOfChoice?: number
    }
    export interface V1GetModelQuestionsInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
      /**
       * Model ID to filter questions
       */
      modelId: string
    }
    export interface V1GetModelQuestionsOutput {
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
      attributeQuestions: V1GetModelQuestionsAttributeQuestionsItemOutput[]
      /**
       * Attribute combinations for the model
       */
      attributeCombinations: V1GetModelQuestionsAttributeCombinationsItemOutput[]
      /**
       * Condition questions for the model
       */
      conditionQuestions: V1GetModelQuestionsConditionQuestionsItemOutput[]
      /**
       * Problem questions for the model
       */
      problemQuestions: V1GetModelQuestionsProblemQuestionsItemOutput[]
      /**
       * Problem image texts for the model
       */
      problemImageTexts: V1GetModelQuestionsProblemImageTextsItemOutput[]
    }
    export interface V1GetModelQuestionsProblemImageTextsItemOutput {
      /**
       * Unique identifier for the problem image text
       */
      id: string // uuid
      /**
       * Name of the problem image text
       */
      name: string
      /**
       * Image URL for the problem image text
       */
      image: string
    }
    export interface V1GetModelQuestionsProblemQuestionsItemOutput {
      /**
       * Unique identifier for the problem
       */
      id: string // uuid
      /**
       * Name of the problem
       */
      name: string
      /**
       * Description of the problem
       */
      description?: string
    }
    export interface V1GetModelsInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
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
    export interface V1GetModelsItemOutput {
      /**
       * Unique identifier for the model
       */
      id: string // uuid
      /**
       * Name of the model
       */
      name: string
      /**
       * Additional brand name for the model. Used when the brand name is not included in the model name, ensuring the model can be found when searching by brand name.
       */
      additionalBrandName?: string
      /**
       * Image URL for the model
       */
      image: string
    }
    export interface V1GetSeriesInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
      /**
       * Category ID to filter series
       */
      categoryId?: string
      /**
       * Brand ID to filter series
       */
      brandId?: string
    }
    export interface V1GetSeriesItemOutput {
      /**
       * Unique identifier for the brand
       */
      id: string // uuid
      /**
       * Name of the brand
       */
      name: string
    }
    export interface V1GetTradeInItemDataAttributeItemInput {
      /**
       * Unique identifier for the condition
       */
      attributeId: string // uuid
      /**
       * Unique identifier for the option
       */
      optionId: string // uuid
    }
    export interface V1GetTradeInItemDataConditionItemInput {
      /**
       * Unique identifier for the condition
       */
      conditionId: string // uuid
      /**
       * Unique identifier for the option
       */
      optionId: string // uuid
    }
    export interface V1GetTradeInItemDataEcoSavingsOutput {
      /**
       * CO2 savings of the item, in g
       */
      savedCo2: number
      /**
       * Raw materials savings of the item, in g
       */
      savedEwaste: number
    }
    export interface V1GetTradeInItemDataInput {
      lang?: /* Language code. Defaults to "nl" */ SupportedLangues
      /**
       * Indicates if the product is functional
       */
      isProductFunctional: boolean
      /**
       * Unique identifier for the model
       */
      modelId: string // uuid
      /**
       * Model attributes
       */
      attributes: V1GetTradeInItemDataAttributeItemInput[]
      /**
       * Conditions of the product if functional
       */
      conditions: V1GetTradeInItemDataConditionItemInput[]
      /**
       * Problems of the product if not functional
       */
      problems: string /* uuid */[]
    }
    export interface V1GetTradeInItemDataOutput {
      /**
       * Unique identifier for the variant (used as an input for the API call "createTradeIn")
       */
      variantId: string // uuid
      /**
       * Indicates if the product is functional (used as an input for the API call "createTradeIn")
       */
      isProductFunctional: boolean
      /**
       * Unique identifier for the condition combination, only available when isProductFunctional is true (used as an input for the API call "createTradeIn")
       */
      conditionCombinationId?: string // uuid
      /**
       * Unique identifier for the problems, only available when isProductFunctional is false (used as an input for the API call "createTradeIn")
       */
      problemIds?: string /* uuid */[]
      /**
       * Product model name (for display purposes only)
       */
      name: string
      /**
       * Product model image (for display purposes only)
       */
      image: string
      /**
       * Product model attributes (for display purposes only)
       */
      attributes: string[]
      /**
       * User's answers (for display purposes only)
       */
      answers: string[]
      /**
       * All payment plans and prices a user can get, with processing time, currently only C2B is supported. If it's an empty array, then this product is not eligible for trade-in
       */
      paymentPlans: V1GetTradeInItemDataPaymentPlanItemOutput[]
      /**
       * Eco savings of the item
       */
      ecoSavings: {
        /**
         * CO2 savings of the item, in g
         */
        savedCo2: number
        /**
         * Raw materials savings of the item, in g
         */
        savedEwaste: number
      }
    }
    export interface V1GetTradeInItemDataPaymentPlanItemOutput {
      /**
       * Payment plan, now only C2B is
       */
      plan: string
      /**
       * Currency of the price (for display purposes only)
       */
      currency: string
      /**
       * Trade-in price in pure number format (for both display and as an input for the API call "createTradeIn")
       */
      price: number
      /**
       * The minimum number of time units before payment is made
       */
      minPaymentTime: number
      /**
       * The maximum number of time units before payment is made
       */
      maxPaymentTime: number
      paymentTimeUnit: /* The time unit for the payment time */ PaymentTimeUnit
    }
    export interface V1WrappedCreateTradeInOutput {
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
         * Unique identifier for the user
         */
        userId: string // uuid
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
    export interface V1WrappedGetBrandsOutput {
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
      data: V1GetBrandsItemOutput[]
    }
    export interface V1WrappedGetCategoriesOutput {
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
      data: V1GetCategoriesItemOutput[]
    }
    export interface V1WrappedGetFaqsOutput {
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
       * Faq list
       */
      data: V1GetFaqsItemOutput[]
    }
    export interface V1WrappedGetModelQuestionsOutput {
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
        attributeQuestions: V1GetModelQuestionsAttributeQuestionsItemOutput[]
        /**
         * Attribute combinations for the model
         */
        attributeCombinations: V1GetModelQuestionsAttributeCombinationsItemOutput[]
        /**
         * Condition questions for the model
         */
        conditionQuestions: V1GetModelQuestionsConditionQuestionsItemOutput[]
        /**
         * Problem questions for the model
         */
        problemQuestions: V1GetModelQuestionsProblemQuestionsItemOutput[]
        /**
         * Problem image texts for the model
         */
        problemImageTexts: V1GetModelQuestionsProblemImageTextsItemOutput[]
      }
    }
    export interface V1WrappedGetModelsOutput {
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
      data: V1GetModelsItemOutput[]
    }
    export interface V1WrappedGetSeriesOutput {
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
      data: V1GetSeriesItemOutput[]
    }
    export interface V1WrappedGetTradeInItemDataOutput {
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
       * Get product item data output
       */
      data: {
        /**
         * Unique identifier for the variant (used as an input for the API call "createTradeIn")
         */
        variantId: string // uuid
        /**
         * Indicates if the product is functional (used as an input for the API call "createTradeIn")
         */
        isProductFunctional: boolean
        /**
         * Unique identifier for the condition combination, only available when isProductFunctional is true (used as an input for the API call "createTradeIn")
         */
        conditionCombinationId?: string // uuid
        /**
         * Unique identifier for the problems, only available when isProductFunctional is false (used as an input for the API call "createTradeIn")
         */
        problemIds?: string /* uuid */[]
        /**
         * Product model name (for display purposes only)
         */
        name: string
        /**
         * Product model image (for display purposes only)
         */
        image: string
        /**
         * Product model attributes (for display purposes only)
         */
        attributes: string[]
        /**
         * User's answers (for display purposes only)
         */
        answers: string[]
        /**
         * All payment plans and prices a user can get, with processing time, currently only C2B is supported. If it's an empty array, then this product is not eligible for trade-in
         */
        paymentPlans: V1GetTradeInItemDataPaymentPlanItemOutput[]
        /**
         * Eco savings of the item
         */
        ecoSavings: {
          /**
           * CO2 savings of the item, in g
           */
          savedCo2: number
          /**
           * Raw materials savings of the item, in g
           */
          savedEwaste: number
        }
      }
    }
  }
}
declare namespace Paths {
  namespace V1ControllerCreateTradeIn {
    export type RequestBody = Components.Schemas.V1CreateTradeInInput
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedCreateTradeInOutput
    }
  }
  namespace V1ControllerGetBrands {
    namespace Parameters {
      export type CategoryId = string
      export type Lang = /* Language code. Defaults to "nl" */ Components.Schemas.SupportedLangues
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      categoryId?: Parameters.CategoryId
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetBrandsOutput
    }
  }
  namespace V1ControllerGetCategories {
    namespace Parameters {
      export type Lang = /* Language code. Defaults to "nl" */ Components.Schemas.SupportedLangues
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetCategoriesOutput
    }
  }
  namespace V1ControllerGetFaqs {
    namespace Parameters {
      export type Collection = /* Faq collection */ Components.Schemas.FaqCollectionType
      export type Lang = /* Language code. Defaults to "nl" */ Components.Schemas.SupportedLangues
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      collection: Parameters.Collection
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetFaqsOutput
    }
  }
  namespace V1ControllerGetModelQuestions {
    namespace Parameters {
      export type Lang = /* Language code. Defaults to "nl" */ Components.Schemas.SupportedLangues
      export type ModelId = string
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      modelId: Parameters.ModelId
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetModelQuestionsOutput
    }
  }
  namespace V1ControllerGetModels {
    namespace Parameters {
      export type BrandId = string
      export type CategoryId = string
      export type Lang = /* Language code. Defaults to "nl" */ Components.Schemas.SupportedLangues
      export type OnlyShowEligible = boolean
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      categoryId: Parameters.CategoryId
      brandId?: Parameters.BrandId
      onlyShowEligible?: Parameters.OnlyShowEligible
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetModelsOutput
    }
  }
  namespace V1ControllerGetSeries {
    namespace Parameters {
      export type BrandId = string
      export type CategoryId = string
      export type Lang = /* Language code. Defaults to "nl" */ Components.Schemas.SupportedLangues
    }
    export interface QueryParameters {
      lang?: Parameters.Lang
      categoryId?: Parameters.CategoryId
      brandId?: Parameters.BrandId
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetSeriesOutput
    }
  }
  namespace V1ControllerGetShippingLabel {
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
  namespace V1ControllerGetTradeInItemData {
    export type RequestBody = Components.Schemas.V1GetTradeInItemDataInput
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetTradeInItemDataOutput
    }
  }
}
