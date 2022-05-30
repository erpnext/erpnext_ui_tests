context('Role Profile', () => {
    before(() => {
        cy.login();
        cy.go_to_list('Website');
    });

    it('Creating new role profile', () => {
		//Creating role profile
		cy.new_doc('Role Profile');
		cy.set_input('role_profile', 'Test RoleProfile');
		cy.save();
		cy.wait(2000);
		cy.get('.select-all').click({force: true, scrollBehavior: false});
		cy.save();

		//Creating a new user using the created role profile
		cy.get('.form-dashboard-section .form-documents .document-link').should('contain', 'User');
		cy.get('.form-dashboard-section .form-documents .document-link button')
			.should('have.class', 'icon-btn').click({force: true, scrollBehavior: false});
		cy.set_input('email', 'test_role_user@exapmle.com');
		cy.set_input('first_name', 'Test Role User');
		cy.click_modal_primary_button('Save');
		//cy.hide_dialog();
		//cy.get('.btn-modal-close').click({force: true, multiple: true});
		//cy.get('.modal').type('{esc}');
		cy.get('.modal-actions button.btn-modal-close').click({force: true, multiple: true});
		cy.wait(1000);

		//Checking if the roles selected in role profile is also checked in the user
		cy.get_field('role_profile_name', 'Link').scrollIntoView().should('have.value', 'Test RoleProfile');
		cy.get_field('roles', 'MultiCheck').should('be.checked');
	});

	it('New user', () => {
		//Creating a new user and using the role profile created
		cy.new_doc('User');
		cy.set_input('email', 'test_role_user123@exapmle.com');
		cy.set_input('first_name', 'Test Role User123');
		cy.save();
		cy.wait(1000);
		cy.get_field('role_profile_name', 'Link').click({force: true, scrollBehavior: false});
		cy.get('[data-fieldname="role_profile_name"] ul:visible li:first-child').should('contain', 'Test RoleProfile');	
		cy.get_field('roles', 'MultiCheck').should('be.checked');
	});

	it('Creating a new role profile with minimum roles and creating user using it', () => {
		//Creating a new role profile with minimum roles assigned
		cy.new_doc('Role Profile');
		cy.set_input('role_profile', 'Test RoleProfile1');
		cy.save();
		cy.wait(1000);
		cy.get('.checkbox-options [type="checkbox"][data-unit="System Manager"]:visible').check();
		cy.get('.checkbox-options [type="checkbox"][data-unit="Sales Manager"]:visible').check();
		cy.save();

		//Creating a new user using the created role profile
		cy.get('.form-dashboard-section .form-documents .document-link').should('contain', 'User');
		cy.get('.form-dashboard-section .form-documents .document-link button')
			.should('have.class', 'icon-btn').click({force: true, scrollBehavior: false});
		cy.set_input('email', 'test_rle_user@example.com');
		cy.set_input('first_name', 'TestRole User');
		cy.click_modal_primary_button('Save');
		cy.hide_dialog();
		cy.wait(1000);

		//Checking if the roles selected in role profile is also checked in the user
		cy.get_field('role_profile_name', 'Link').scrollIntoView().should('have.value', 'Test RoleProfile1');
		cy.get('.role-editor [type="checkbox"][data-unit="System Manager"]:visible').should('be.checked');
		cy.get('.role-editor [type="checkbox"][data-unit="Sales Manager"]:visible').should('be.checked');

		//Deleting the user and the role profile
		cy.delete_first_record('user');
		cy.hide_dialog();
		cy.delete_first_record('role profile');
		cy.hide_dialog();
	});

	it('Deleting user and role profile', () => {
        //Deleting the user
        cy.delete_first_record('user');
        cy.hide_dialog();
		cy.delete_first_record('user');
		cy.hide_dialog();

		//Deleting the role profile
		cy.delete_first_record('role profile');
		cy.hide_dialog();
    });
});