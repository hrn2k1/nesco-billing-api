import { User, Meter } from "@prisma/client";
import { UserDto } from "./user";
import { MeterDto } from "./meter";

export class Mapper {
    public static toUserDto(user: User): UserDto {
        return {
            id: user.id,
            name: user.name,
            loginName: user.loginName,
            password: user.password ?? undefined,
            provider: user.provider ?? 'app',
            email: user.email ?? undefined,
            mobileNo: user.mobileNo ?? undefined,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt ?? undefined,
        };
    }

     public static toMeterDto(meter: Meter): MeterDto {
        return {
            id: meter.id,
            name: meter.name,
            accountNo: meter.accountNo,
            accountType: meter.accountType ?? "Prepaid",
            provider: meter.provider ?? 'app',
            userId: meter.userId ?? undefined,
            createdAt: meter.createdAt,
            updatedAt: meter.updatedAt ?? undefined,
        };
    }
}