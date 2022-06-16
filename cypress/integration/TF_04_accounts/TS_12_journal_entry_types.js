context("Journal Entry Types", () => {
	before(() => {
		cy.login();
	});

	it("Opening Entry (Journal Entry)", () => {
		cy.insert_doc(
			"Account",
			{
			 account_name: "Shareholders Funds",
			 is_group: 0,
			 root_type: "Liability",
			 report_type: "Balance Sheet",
			 account_currency: "INR",
			 parent_account: "Capital Account - WP",
			},
			true
		)
		cy.new_doc('Journal Entry');

		//Setting the type as Opening Entry
		cy.set_select('voucher_type', 'Opening Entry');

		//Checking if naming series, posting date etc are not empty
		cy.get_select('naming_series').should('not.be.empty');
		cy.get_select('naming_series').should('contain', 'ACC-JV-.YYYY.-');
		cy.get_input('company').should('not.have.value', '');
		cy.get_input('posting_date').should('not.have.value', '');
		const todaysDate = Cypress.moment().format('DD-MM-YYYY');
		cy.get_input('posting_date').should('have.value', todaysDate);

		//Checking if the accounting entires are of type "Asset" and "Liability" only
		cy.grid_open_row('accounts', 3);
		cy.get_input('account').click({force: true});
		cy.click_link_button();
		cy.get_read_only('root_type').should('contain', 'Asset');
		cy.go('back');
		cy.grid_open_row('accounts', 18);
		cy.get_input('account').click({force: true});
		cy.click_link_button();
		cy.get_read_only('root_type').should('contain', 'Asset');
		cy.go('back');
		cy.grid_open_row('accounts', 35);
		cy.get_input('account').click({force: true});
		cy.click_link_button();
		cy.get_read_only('root_type').should('contain', 'Liability');
		cy.go('back');

		//Deleting all the rows and adding credit and debit entries
		cy.scrollTo('top', {ensureScrollable: false});
		cy.grid_delete_all();
		cy.wait(5000);
		cy.grid_add_row('accounts');
		cy.set_link('accounts.account', 'Shareholders Funds');
		cy.set_input('accounts.credit_in_account_currency', '50000');
		cy.grid_add_row('accounts');
		cy.set_link('accounts.account', 'Temporary Opening');
		cy.set_input('accounts.debit_in_account_currency', '50000');
		cy.get_input('cheque_no').click({force: true});

		//Verifying if the credit=debit
		cy.get_read_only('total_credit').contains('₹ 50,000.00');
		cy.get_read_only('total_debit').contains('₹ 50,000.00');

		//Checking if "Is Opening" is set to "Yes"
		cy.click_section('More Information');
		cy.get_select('is_opening').should('contain', 'Yes');

		//Saving, Submitting and Cancelling the doc
		cy.save();
		cy.submit();
		cy.click_toolbar_button('Cancel');
		cy.click_modal_primary_button('Yes');
	});
});
