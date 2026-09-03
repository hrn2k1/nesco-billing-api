/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './controllers/usersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MetersController } from './controllers/metersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CustomersController } from './controllers/customersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './controllers/authController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "loginName": {"dataType":"string","required":true},
            "password": {"dataType":"string"},
            "provider": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":["app"]},{"dataType":"enum","enums":["google"]},{"dataType":"enum","enums":["facebook"]},{"dataType":"enum","enums":["microsoft"]}]},
            "email": {"dataType":"string"},
            "mobileNo": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserInput": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "loginName": {"dataType":"string","required":true},
            "password": {"dataType":"string"},
            "provider": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["app"]},{"dataType":"enum","enums":["google"]},{"dataType":"enum","enums":["facebook"]},{"dataType":"enum","enums":["microsoft"]}]},
            "email": {"dataType":"string"},
            "mobileNo": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserInput": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string"},
            "mobileNo": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChangePasswordInput": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MeterDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "accountNo": {"dataType":"string","required":true},
            "accountType": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":["Prepaid"]},{"dataType":"enum","enums":["Postpaid"]},{"dataType":"enum","enums":[null]}]},
            "provider": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":["NESCO"]},{"dataType":"enum","enums":["DESCO"]}]},
            "userId": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMeterInput": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "accountNo": {"dataType":"string","required":true},
            "accountType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Prepaid"]},{"dataType":"enum","enums":["Postpaid"]}]},
            "provider": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["NESCO"]},{"dataType":"enum","enums":["DESCO"]}]},
            "userId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateMeterInput": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "accountNo": {"dataType":"string"},
            "accountType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Prepaid"]},{"dataType":"enum","enums":["Postpaid"]}]},
            "provider": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["NESCO"]},{"dataType":"enum","enums":["DESCO"]}]},
            "userId": {"dataType":"string"},
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
    "LoginResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "loginName": {"dataType":"string","required":true},
            "provider": {"dataType":"string"},
            "email": {"dataType":"string"},
            "mobileNo": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppLoginInput": {
        "dataType": "refObject",
        "properties": {
            "loginName": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OAuthLoginInput": {
        "dataType": "refObject",
        "properties": {
            "loginName": {"dataType":"string","required":true},
            "provider": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["google"]},{"dataType":"enum","enums":["facebook"]},{"dataType":"enum","enums":["microsoft"]}],"required":true},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginInput": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"AppLoginInput"},{"ref":"OAuthLoginInput"}],"validators":{}},
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


    
        const argsUsersController_getUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.getUsers)),

            async function UsersController_getUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_getUsers, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'getUsers',
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
        const argsUsersController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateUserInput"},
        };
        app.patch('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.updateUser)),

            async function UsersController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_updateUser, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'updateUser',
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
        const argsUsersController_changePassword: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"ChangePasswordInput"},
        };
        app.patch('/users/:id/change-password',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.changePassword)),

            async function UsersController_changePassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_changePassword, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'changePassword',
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
        const argsUsersController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.deleteUser)),

            async function UsersController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_deleteUser, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
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
        const argsMetersController_getMeters: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"query","name":"userId","dataType":"string"},
        };
        app.get('/meters',
            ...(fetchMiddlewares<RequestHandler>(MetersController)),
            ...(fetchMiddlewares<RequestHandler>(MetersController.prototype.getMeters)),

            async function MetersController_getMeters(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMetersController_getMeters, request, response });

                const controller = new MetersController();

              await templateService.apiHandler({
                methodName: 'getMeters',
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
        const argsMetersController_getMeter: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/meters/:id',
            ...(fetchMiddlewares<RequestHandler>(MetersController)),
            ...(fetchMiddlewares<RequestHandler>(MetersController.prototype.getMeter)),

            async function MetersController_getMeter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMetersController_getMeter, request, response });

                const controller = new MetersController();

              await templateService.apiHandler({
                methodName: 'getMeter',
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
        const argsMetersController_createMeter: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateMeterInput"},
        };
        app.post('/meters',
            ...(fetchMiddlewares<RequestHandler>(MetersController)),
            ...(fetchMiddlewares<RequestHandler>(MetersController.prototype.createMeter)),

            async function MetersController_createMeter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMetersController_createMeter, request, response });

                const controller = new MetersController();

              await templateService.apiHandler({
                methodName: 'createMeter',
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
        const argsMetersController_updateMeter: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateMeterInput"},
        };
        app.put('/meters/:id',
            ...(fetchMiddlewares<RequestHandler>(MetersController)),
            ...(fetchMiddlewares<RequestHandler>(MetersController.prototype.updateMeter)),

            async function MetersController_updateMeter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMetersController_updateMeter, request, response });

                const controller = new MetersController();

              await templateService.apiHandler({
                methodName: 'updateMeter',
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
        const argsMetersController_deleteMeter: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/meters/:id',
            ...(fetchMiddlewares<RequestHandler>(MetersController)),
            ...(fetchMiddlewares<RequestHandler>(MetersController.prototype.deleteMeter)),

            async function MetersController_deleteMeter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMetersController_deleteMeter, request, response });

                const controller = new MetersController();

              await templateService.apiHandler({
                methodName: 'deleteMeter',
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
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateUserInput"},
        };
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
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
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LoginInput"},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
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
