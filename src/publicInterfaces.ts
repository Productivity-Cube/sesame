import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, Min, ValidationError, IsNumber } from 'class-validator'
import { EventModel } from './models/event'

// tslint:disable:max-classes-per-file no-shadowed-variable no-unnecessary-qualifier
export namespace API {
  export interface Error {
    name: string
  }

  export interface ValidationErrorResponse {
    name: string
    message: string
    errors: ValidationError[]
  }

  export namespace Status {
    export namespace Get {
      export interface Response {
        status: string
      }
    }
  }
  export namespace Clients {
    export namespace  Post {
      export class Body {
        ingoing?: boolean
      }
      export type Response = Object
    }
    export namespace Number {
      export namespace Max {
        export namespace Put {
          export class Body {
            @IsNotEmpty()
            @IsNumber()
            @Min(1)
            max?: number
          }

          export type Response = Object
        }
        export namespace Get {
          export interface Response {
            max: number
          }
        }
      }
      export namespace Get {
        export interface Response {
          currentClients: number
        }
      }
    }
  }
  export namespace Events {
    export namespace Get {
      export enum GroupByOptions {
        day = 'day',
        hour = 'hour',
      }

      export class Params {
        @IsString()
        userName: string = ''
      }

      export class QueryParams {
        @IsString()
        @IsEnum(GroupByOptions)
        @IsOptional()
        groupBy?: GroupByOptions

        @IsString()
        @IsOptional()
        activity?: string

        @IsOptional()
        productivityRate?: string | number

        @IsString()
        @IsOptional()
        dateFrom?: string

        @IsString()
        @IsOptional()
        dateTo?: string
      }

      export type Response = EventModel[]

      export namespace GroupBy {
        export type QueryParams = API.Events.Get.QueryParams
        export interface Response {
          [key: string]: EventModel[]
        }

        export class Params extends API.Events.Get.Params {
          @IsString()
          groupBy: string = ''
        }
      }
    }
    export namespace Post {
      export class Body {
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        name: string = ''
      }

      export type Response = EventModel
    }
  }
  export namespace Login {
    export namespace Post {
      export class Body {
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        login?: string
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        password?: string
      }

      export interface Response {
        accessToken: string,
        refreshToken: string
      }
    }
  }
}
