import { pgTable, pgEnum, uuid, text, jsonb, timestamp, boolean, foreignKey, bigint, integer } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn', 'phone'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const oneTimeTokenType = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const pricingType = pgEnum("pricing_type", ['one_time', 'recurring'])
export const pricingPlanInterval = pgEnum("pricing_plan_interval", ['day', 'week', 'month', 'year'])
export const subscriptionStatus = pgEnum("subscription_status", ['trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid'])


export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	billingAddress: jsonb("billing_address"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	paymentMethod: jsonb("payment_method"),
	email: text("email"),
});

export const customers = pgTable("customers", {
	id: uuid("id").primaryKey().notNull(),
	stripeCustomerId: text("stripe_customer_id"),
});

export const products = pgTable("products", {
	id: text("id").primaryKey().notNull(),
	active: boolean("active"),
	name: text("name"),
	description: text("description"),
	image: text("image"),
	metadata: jsonb("metadata"),
});

export const prices = pgTable("prices", {
	id: text("id").primaryKey().notNull(),
	productId: text("product_id").references(() => products.id),
	active: boolean("active"),
	description: text("description"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	unitAmount: bigint("unit_amount", { mode: "number" }),
	currency: text("currency"),
	type: pricingType("type"),
	interval: pricingPlanInterval("interval"),
	intervalCount: integer("interval_count"),
	trialPeriodDays: integer("trial_period_days"),
	metadata: jsonb("metadata"),
});

export const subscriptions = pgTable("subscriptions", {
	id: text("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	status: subscriptionStatus("status"),
	metadata: jsonb("metadata"),
	priceId: text("price_id").references(() => prices.id),
	quantity: integer("quantity"),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp("created", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())).notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(timezone('utc'::text, now())),
});

function timezone(arg0: string, text: <TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: import("drizzle-orm/pg-core").PgTextConfig<T | import("drizzle-orm").Writable<T>>) => import("drizzle-orm/pg-core").PgTextBuilder<{ name: TName; dataType: "string"; columnType: "PgText"; data: import("drizzle-orm").Writable<T>[number]; enumValues: import("drizzle-orm").Writable<T>; driverParam: string }>, arg2: any): string | import("drizzle-orm").SQL<unknown> {
	throw new Error("Function not implemented.")
}
function now(): any {
	throw new Error("Function not implemented.")
}

