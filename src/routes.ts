/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './controllers/usersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CustomersController } from './controllers/customersController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserInput": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICustomerInfo": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "careOf": {"dataType":"string"},
            "consumerNo": {"dataType":"string"},
            "type": {"dataType":"string"},
            "address": {"dataType":"string"},
            "mobile": {"dataType":"string"},
            "concernOffice": {"dataType":"string"},
            "feederName": {"dataType":"string"},
            "meterNo": {"dataType":"string"},
            "meterType": {"dataType":"string"},
            "meterStatus": {"dataType":"string"},
            "loadKw": {"dataType":"double"},
            "tariff": {"dataType":"string"},
            "balance": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICustomerBill": {
        "dataType": "refObject",
        "properties": {
            "billNo": {"dataType":"string","required":true},
            "year": {"dataType":"double","required":true},
            "month": {"dataType":"string","required":true},
            "totalBill": {"dataType":"double","required":true},
            "lateFee": {"dataType":"double","required":true},
            "dueDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "paidAmount": {"dataType":"double","required":true},
            "paymentDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "paymentMethod": {"dataType":"string","required":true},
            "paymentStatus": {"dataType":"string","required":true},
            "detailUrl": {"dataType":"string"},
            "consumerNo": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICustomerBillResponse": {
        "dataType": "refObject",
        "properties": {
            "customerInfo": {"ref":"ICustomerInfo","required":true},
            "bills": {"dataType":"array","array":{"dataType":"refObject","ref":"ICustomerBill"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRechargeHistory": {
        "dataType": "refObject",
        "properties": {
            "slNo": {"dataType":"double","required":true},
            "seqNo": {"dataType":"string","required":true},
            "tokenNumber": {"dataType":"string","required":true},
            "meterRent": {"dataType":"double","required":true},
            "demandCharge": {"dataType":"double","required":true},
            "pfcCharge": {"dataType":"double","required":true},
            "vat": {"dataType":"double","required":true},
            "paidDebt": {"dataType":"double","required":true},
            "rebate": {"dataType":"double","required":true},
            "energyAmount": {"dataType":"double","required":true},
            "rechargeAmount": {"dataType":"double","required":true},
            "estimatedUnit": {"dataType":"double","required":true},
            "rechargeMedia": {"dataType":"string","required":true},
            "rechargeDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "remoteRechargeStatus": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRechargeHistoryResponse": {
        "dataType": "refObject",
        "properties": {
            "customerInfo": {"ref":"ICustomerInfo","required":true},
            "rechargeHistories": {"dataType":"array","array":{"dataType":"refObject","ref":"IRechargeHistory"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMonthlyConsumption": {
        "dataType": "refObject",
        "properties": {
            "year": {"dataType":"double"},
            "month": {"dataType":"string"},
            "totalRecharge": {"dataType":"double"},
            "rebate": {"dataType":"double"},
            "energyUsage": {"dataType":"double"},
            "meterRent": {"dataType":"double"},
            "demandCharge": {"dataType":"double"},
            "pfcCharge": {"dataType":"double"},
            "paidDebt": {"dataType":"double"},
            "vat": {"dataType":"double"},
            "totalUsageDeduction": {"dataType":"double"},
            "monthEndBalance": {"dataType":"double"},
            "energyUsageUnit": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMonthlyConsumptionResponse": {
        "dataType": "refObject",
        "properties": {
            "customerInfo": {"ref":"ICustomerInfo","required":true},
            "monthlyConsumptions": {"dataType":"array","array":{"dataType":"refObject","ref":"IMonthlyConsumption"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsersController_getUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.getUser)),

            async function UsersController_getUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_getUser, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'getUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateUserInput"},
        };
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.createUser)),

            async function UsersController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_createUser, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCustomersController_getCustomerBills: Record<string, TsoaRoute.ParameterSchema> = {
                customerCode: {"in":"path","name":"customerCode","required":true,"dataType":"string"},
        };
        app.get('/customers/:customerCode/bills',
            ...(fetchMiddlewares<RequestHandler>(CustomersController)),
            ...(fetchMiddlewares<RequestHandler>(CustomersController.prototype.getCustomerBills)),

            async function CustomersController_getCustomerBills(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCustomersController_getCustomerBills, request, response });

                const controller = new CustomersController();

              await templateService.apiHandler({
                methodName: 'getCustomerBills',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCustomersController_getCustomerRechargeHistories: Record<string, TsoaRoute.ParameterSchema> = {
                customerCode: {"in":"path","name":"customerCode","required":true,"dataType":"string"},
        };
        app.get('/customers/:customerCode/recharge-histories',
            ...(fetchMiddlewares<RequestHandler>(CustomersController)),
            ...(fetchMiddlewares<RequestHandler>(CustomersController.prototype.getCustomerRechargeHistories)),

            async function CustomersController_getCustomerRechargeHistories(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCustomersController_getCustomerRechargeHistories, request, response });

                const controller = new CustomersController();

              await templateService.apiHandler({
                methodName: 'getCustomerRechargeHistories',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCustomersController_getCustomerMonthlyConsumption: Record<string, TsoaRoute.ParameterSchema> = {
                customerCode: {"in":"path","name":"customerCode","required":true,"dataType":"string"},
        };
        app.get('/customers/:customerCode/monthly-consumption',
            ...(fetchMiddlewares<RequestHandler>(CustomersController)),
            ...(fetchMiddlewares<RequestHandler>(CustomersController.prototype.getCustomerMonthlyConsumption)),

            async function CustomersController_getCustomerMonthlyConsumption(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCustomersController_getCustomerMonthlyConsumption, request, response });

                const controller = new CustomersController();

              await templateService.apiHandler({
                methodName: 'getCustomerMonthlyConsumption',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
