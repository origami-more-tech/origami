namespace $.$$ {
	export class $origami_app_bank extends $.$origami_app_bank {
		
		@ $mol_mem
		banks_data(){
			console.log('banks')
			return this.$.$mol_fetch
				.json( 'https://origami-team.site/office/all' ) as { id: string, salePointName?: string, address: string, type?: string, distance?: number }[]
		}

		banks() {
			return this.banks_data()
		}

		bank_id(id: string) {
			return this.banks().find( (bank) => bank.id == id )
		}

		bank_list(): readonly any[] {
			console.log(this.banks())
			return this.banks().map( (bank) =>  this.Bank(bank.id))
		}

		bank_name( id: any ): string {
			return this.bank_id(id)?.salePointName || ''
		}

		bank_address( id: any ): string {
			return this.bank_id(id)?.address || ''
		}

		bank_type( id: any ): string {
			return this.bank_id(id)?.type || ''
		}

		bank_workload( id: any ) {
			const workload = (this.bank_id(id)?.salePointName?.length || 3) % 3
			return `Загруженность ${workload}`
		}

		bank_distance( id: any ) {
			const distance = this.bank_id(id)?.distance
			if (!distance) return ''
			else if (distance > 1000) { return `${(distance / 1000).toFixed(1)} км` } 
			else { return `${distance} м` }
		}
	}
}
