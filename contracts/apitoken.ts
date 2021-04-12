export default interface ApiToken {
	type: string
	token: string
	expires_at?: string | undefined
	expires_in?: number | undefined
}
