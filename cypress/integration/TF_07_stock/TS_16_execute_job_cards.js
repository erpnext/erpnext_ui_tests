context('Executing Job Cards', () => {
	before(() => {
        cy.login();
    });

	it('Check status of Work Order', () => {
		cy.visit('/app/work-order');
		cy.click_listview_row_item(0);
		cy.get_page_title().should('contain', 'In Process');
		cy.get_read_only('material_transferred_for_manufacturing').should('contain','1');
	});

	it('Complete first operation via Job Cards', () => {
		cy.visit('app/job-card/view/list');

		//Complete first operation
		cy.click_listview_row_item(0);
		cy.click_toolbar_button('Start Job');
		cy.on('window:alert',  (str) =>  {
			  expect(str).to.equal(`Assign Job to Employee`)});
		cy.set_input_multiselect('employees', 'John Mayer');
		cy.click_modal_primary_button('Submit');
		cy.wait(1000);
		cy.click_toolbar_button('Complete Job');
		cy.set_input('qty', '1');
		cy.click_modal_primary_button('Submit');
		cy.submit('Completed');
	});

	it('Complete second operation via Job Cards', () => {
		cy.visit('app/job-card/view/list');

		//Complete second operation
		cy.click_listview_row_item(1);
		cy.click_toolbar_button('Start Job');
		cy.on('window:alert',  (str) =>  {
			  expect(str).to.equal(`Assign Job to Employee`)});
		cy.set_input_multiselect('employees', 'John Mayer');
		cy.click_modal_primary_button('Submit');
		cy.wait(1000);
		cy.click_toolbar_button('Complete Job');
		cy.set_input('qty', '1');
		cy.click_modal_primary_button('Submit');
		cy.click_modal_primary_button('Yes');
		cy.submit('Completed');
	});

	it('Complete third operation via Job Cards', () => {
		cy.visit('app/job-card/view/list');

		//Complete third operation
		cy.click_listview_row_item(2);
		cy.click_toolbar_button('Start Job');
		cy.on('window:alert',  (str) =>  {
			  expect(str).to.equal(`Assign Job to Employee`)});
		cy.set_input_multiselect('employees', 'John Mayer');
		cy.click_modal_primary_button('Submit');
		cy.wait(1000);
		cy.click_toolbar_button('Complete Job');
		cy.set_input('qty', '1');
		cy.click_modal_primary_button('Submit');
		cy.submit('Completed');
	});
});
