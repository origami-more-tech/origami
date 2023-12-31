namespace $.$$ {
	export class $origami_app_calc extends $.$origami_app_calc {

		@$mol_mem
		result_loan_data( next?: any ) {
			if( !next ) return

			const result =  this.$.$mol_fetch.json( 'https://origami-team.site/calc/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify( { loan_amount: this.amount(), interest_rate: this.rate(), loan_term: this.term() } )
			} ) as {
				monthlyPayment: number,
				sumCreditFull: number,
				sumPayment: number,
				overpayment: number,
				createdAt: string,
				dateAtLast: string,
				office: {
					id: string,
					salePointName: string,
					address: string,
					latitude: number,
					longitude: number,
				}
			}
			this.$.$mol_state_arg.value('bank', result.office.id)
			return result
		}

		loan_submit( next?: any ) {
			this.result_loan_data( true )
		}

		amount_bid(): string {
			return this.amount() > 10000 ? "" : "*"
		}

		rate_bid(): string {
			return this.rate() > 3 ? "" : "*"
		}

		is_enabled( next?: any ): boolean {
			return (this.amount_bid() + this.rate_bid() + this.term_bid()) === ''
		}

		first_payment(): string {
			return this.result_loan_data()?.createdAt ?? ''
		}

		last_payment(): string {
			return this.result_loan_data()?.dateAtLast ?? ''
		}
		overpayment(): string {
			return String( this.result_loan_data()?.overpayment ?? '' ) + ' ₽'
		}
		amount_all(): string {
			return String( this.result_loan_data()?.sumCreditFull ?? '' ) + ' ₽'
		}
		monthly_payment(): string {
			return String( this.result_loan_data()?.monthlyPayment ?? '' ) + ' ₽'
		}

		rows(): readonly $mol_view[] {
			return this.result_loan_data() ? [ this.Map(), this.Result_card() ] : [ this.Loan_card() ]
		}

	}
}
