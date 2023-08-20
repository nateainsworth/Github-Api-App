describe('githubApiService', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/Github-Api-App/ ');
    })

    it('fetches user data on username input', () => {

        // type username into search field
        cy.get('#github-search').clear().type('nateainsworth{enter}');
        // wait to load the profile
        cy.wait(1000);
        // check the profile has loaded by checking the name field
        cy.get('#user-name').should('contain', 'Nate Ainsworth');

    });

    it('check private repos load on token input', () => {
        // get api token from env file
        const apiToken = Cypress.env('GITHUB_API_TOKEN');

        //put token into search field and enter
        cy.get('#token-search').clear().type( `${apiToken}{enter}`);
        //wait for repo refresh
        cy.wait(1000);
        
        cy.get('#filter-button').click({force:true});

        cy.get('#filter-option-1').click({force:true});
        cy.wait(1000);

        // todo: do a check on the field in the repo section...


    });


    //todo perform additional testing on the filtering
   
});
