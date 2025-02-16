declare namespace Components {
  namespace Schemas {
    export type FaqCollectionType = 'SELLER_PLAN' | 'SELLER_MAIN' | 'BUYER_MAIN'
    export type PartnerPlatform = 'STANDALONE' | 'EMBEDDED'
    export type PaymentTimeUnit = 'HOURS' | 'DAYS'
    export type SupportedLangues = 'en' | 'nl' | 'de'
    export type TradeInItemOfferConfirmationType = 'ACCEPT' | 'DECLINE_RECYCLE' | 'DECLINE_RETURN'
    export type TradeInOrderItemOfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
    export type TradeInOrderItemStatus =
      | 'SUBMITTED'
      | 'RECEIVED'
      | 'MANUAL_OFFER'
      | 'PENDING_OFFER'
      | 'PENDING_PAYMENT'
      | 'PENDING_RETURN'
      | 'PENDING_RECYCLE'
      | 'RETURNED'
      | 'PAYMENT_IN_PROCESS'
      | 'PAYMENT_FAILED'
      | 'NOT_RECEIVED'
      | 'COMPLETED'
      | 'UNKNOWN'
    export type TradeInOrderStatus = 'SUBMITTED' | 'RECEIVED' | 'CANCELLED' | 'COMPLETED'
    export type TradeInPaymentType = 'BANK_TRANSFER' | 'DONATION' | 'BULK_SETTLEMENT'
    export interface V1ConfirmTradeInItemOfferInput {
      /**
       * Confirmation type
       */
      confirmationType: 'ACCEPT' | 'DECLINE_RECYCLE' | 'DECLINE_RETURN'
    }
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
      items: V1CreateTradeInItemInput[]
      /**
       * Payment type, defaults to BANK_TRANSFER
       */
      paymentType?: 'BANK_TRANSFER' | 'DONATION' | 'BULK_SETTLEMENT'
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
       * Partner's platform type: standalone sub-site or embedded solution. Defaults to EMBEDDED
       */
      partnerPlatform?: 'STANDALONE' | 'EMBEDDED'
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
       * Version number for this trade-in order
       */
      version: number
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
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
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
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
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
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
      /**
       * Faq collection
       */
      collection: 'SELLER_PLAN' | 'SELLER_MAIN' | 'BUYER_MAIN'
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
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
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
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
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
       * E-waste savings of the item, in g
       */
      savedEwaste: number
    }
    export interface V1GetTradeInItemDataInput {
      /**
       * Language code. Defaults to "nl"
       */
      lang?: 'en' | 'nl' | 'de'
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
       * Indicates if the item is eligible for trade-in and has trade-in value
       */
      isEligibleForTradeIn: boolean
      /**
       * Eco savings of the item
       */
      ecoSavings: {
        /**
         * CO2 savings of the item, in g
         */
        savedCo2: number
        /**
         * E-waste savings of the item, in g
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
      /**
       * The time unit for the payment time
       */
      paymentTimeUnit: 'HOURS' | 'DAYS'
    }
    export interface V1TradeInOrderDataOutput {
      /**
       * Revision version number of the trade-in
       */
      tradeInVersion: number
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
       * Status of the trade-in
       */
      status: 'SUBMITTED' | 'RECEIVED' | 'CANCELLED' | 'COMPLETED'
      /**
       * Indicates if the shipping label is paperless
       */
      isShippingLabelPaperless: boolean
      /**
       * Tracking number of the shipping label
       */
      trackingNumber: string
      /**
       * Tracking URL of the shipping label
       */
      trackingUrl: string
      /**
       * List of items in the trade-in. If returnTradeInItems is false, this will be undefined
       */
      items: V1TradeInOrderItemDataOutput[]
    }
    export interface V1TradeInOrderItemDataOutput {
      /**
       * Revision version number of the item
       */
      tradeInItemVersion: number
      /**
       * Unique identifier for the item
       */
      tradeInItemId: string // uuid
      /**
       * Status of the item
       */
      status:
        | 'SUBMITTED'
        | 'RECEIVED'
        | 'MANUAL_OFFER'
        | 'PENDING_OFFER'
        | 'PENDING_PAYMENT'
        | 'PENDING_RETURN'
        | 'PENDING_RECYCLE'
        | 'RETURNED'
        | 'PAYMENT_IN_PROCESS'
        | 'PAYMENT_FAILED'
        | 'NOT_RECEIVED'
        | 'COMPLETED'
        | 'UNKNOWN'
      /**
       * Offer status of the item
       */
      offerStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
      /**
       * Offer note of the item
       */
      offerGradingNote?: string
      /**
       * Unique identifier for the variant (used as an input for the API call "createTradeIn")
       */
      variantId: string // uuid
      /**
       * Indicates if the product is functional (used as an input for the API call "createTradeIn")
       */
      isProductFunctional: boolean
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
       * Payment plan and prices a user can get, with processing time, currently only C2B is supported
       */
      paymentPlan: {
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
        /**
         * The time unit for the payment time
         */
        paymentTimeUnit: 'HOURS' | 'DAYS'
      }
    }
    export interface V1WrappedConfirmTradeInItemOfferOutput {
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
         * Version number for this trade-in order
         */
        version: number
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
         * Indicates if the item is eligible for trade-in and has trade-in value
         */
        isEligibleForTradeIn: boolean
        /**
         * Eco savings of the item
         */
        ecoSavings: {
          /**
           * CO2 savings of the item, in g
           */
          savedCo2: number
          /**
           * E-waste savings of the item, in g
           */
          savedEwaste: number
        }
      }
    }
    export interface V1WrappedGetTradeInOrderDataOutput {
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
       * Indicates if the data has updates since the last version
       */
      hasUpdates: boolean
      /**
       * Get trade-in order data
       */
      data: {
        /**
         * Revision version number of the trade-in
         */
        tradeInVersion: number
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
         * Status of the trade-in
         */
        status: 'SUBMITTED' | 'RECEIVED' | 'CANCELLED' | 'COMPLETED'
        /**
         * Indicates if the shipping label is paperless
         */
        isShippingLabelPaperless: boolean
        /**
         * Tracking number of the shipping label
         */
        trackingNumber: string
        /**
         * Tracking URL of the shipping label
         */
        trackingUrl: string
        /**
         * List of items in the trade-in. If returnTradeInItems is false, this will be undefined
         */
        items: V1TradeInOrderItemDataOutput[]
      }
    }
    export interface V1WrappedGetTradeInOrderItemDataOutput {
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
       * Indicates if the data has updates since the last version
       */
      hasUpdates: boolean
      /**
       * Get trade-in order item data
       */
      data: {
        /**
         * Revision version number of the item
         */
        tradeInItemVersion: number
        /**
         * Unique identifier for the item
         */
        tradeInItemId: string // uuid
        /**
         * Status of the item
         */
        status:
          | 'SUBMITTED'
          | 'RECEIVED'
          | 'MANUAL_OFFER'
          | 'PENDING_OFFER'
          | 'PENDING_PAYMENT'
          | 'PENDING_RETURN'
          | 'PENDING_RECYCLE'
          | 'RETURNED'
          | 'PAYMENT_IN_PROCESS'
          | 'PAYMENT_FAILED'
          | 'NOT_RECEIVED'
          | 'COMPLETED'
          | 'UNKNOWN'
        /**
         * Offer status of the item
         */
        offerStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
        /**
         * Offer note of the item
         */
        offerGradingNote?: string
        /**
         * Unique identifier for the variant (used as an input for the API call "createTradeIn")
         */
        variantId: string // uuid
        /**
         * Indicates if the product is functional (used as an input for the API call "createTradeIn")
         */
        isProductFunctional: boolean
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
         * Payment plan and prices a user can get, with processing time, currently only C2B is supported
         */
        paymentPlan: {
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
          /**
           * The time unit for the payment time
           */
          paymentTimeUnit: 'HOURS' | 'DAYS'
        }
      }
    }
  }
}
declare namespace Paths {
  namespace V1ControllerCancelTradeIn {
    namespace Parameters {
      export type TradeInId = string
    }
    export interface PathParameters {
      tradeInId: Parameters.TradeInId
    }
    namespace Responses {
      export interface $200 {}
      export interface $400 {}
      export interface $404 {}
      export interface $500 {}
    }
  }
  namespace V1ControllerConfirmTradeInItemOffer {
    namespace Parameters {
      export type TradeInItemId = string
    }
    export interface PathParameters {
      tradeInItemId: Parameters.TradeInItemId
    }
    export type RequestBody = Components.Schemas.V1ConfirmTradeInItemOfferInput
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedConfirmTradeInItemOfferOutput
    }
  }
  namespace V1ControllerCreateTradeIn {
    export type RequestBody = Components.Schemas.V1CreateTradeInInput
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedCreateTradeInOutput
    }
  }
  namespace V1ControllerGetBrands {
    namespace Parameters {
      export type CategoryId = string
      export type Lang = Components.Schemas.SupportedLangues
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
      export type Lang = Components.Schemas.SupportedLangues
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
      export type Collection = Components.Schemas.FaqCollectionType
      export type Lang = Components.Schemas.SupportedLangues
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
      export type Lang = Components.Schemas.SupportedLangues
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
      export type Lang = Components.Schemas.SupportedLangues
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
  namespace V1ControllerGetPaperlessCode {
    namespace Parameters {
      export type Format = 'PDF' | 'PNG'
      export type TradeInId = string // uuid
    }
    export interface PathParameters {
      tradeInId: Parameters.TradeInId /* uuid */
    }
    export interface QueryParameters {
      format?: Parameters.Format
    }
    namespace Responses {
      export type $200 = string // binary
      export interface $404 {}
      export interface $500 {}
    }
  }
  namespace V1ControllerGetSeries {
    namespace Parameters {
      export type BrandId = string
      export type CategoryId = string
      export type Lang = Components.Schemas.SupportedLangues
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
      export type Format = 'PDF' | 'PNG'
      export type TradeInId = string // uuid
    }
    export interface PathParameters {
      tradeInId: Parameters.TradeInId /* uuid */
    }
    export interface QueryParameters {
      format?: Parameters.Format
    }
    namespace Responses {
      export type $200 = string // binary
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
  namespace V1ControllerGetTradeInOrderData {
    namespace Parameters {
      export type ReturnTradeInItems = boolean
      export type TradeInId = string
      export type Version = number
    }
    export interface PathParameters {
      tradeInId: Parameters.TradeInId
    }
    export interface QueryParameters {
      version?: Parameters.Version
      returnTradeInItems?: Parameters.ReturnTradeInItems
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetTradeInOrderDataOutput
      export interface $404 {}
      export interface $500 {}
    }
  }
  namespace V1ControllerGetTradeInOrderItemData {
    namespace Parameters {
      export type TradeInItemId = string
      export type Version = number
    }
    export interface PathParameters {
      tradeInItemId: Parameters.TradeInItemId
    }
    export interface QueryParameters {
      version?: Parameters.Version
    }
    namespace Responses {
      export type $200 = Components.Schemas.V1WrappedGetTradeInOrderItemDataOutput
      export interface $404 {}
      export interface $500 {}
    }
  }
}
