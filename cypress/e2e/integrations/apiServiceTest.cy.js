describe('githubApiService', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/Github-Api-App/ ');
        cy.get('#github-search').clear()
        cy.get('#token-search').clear()
        // wait and refresh any existing search
        cy.wait(1000);
        

    })

    it.skip('fetches user data on username input', () => {

        // type username into search field
        cy.get('#github-search').type('nateainsworth');
        cy.get('#search-button').click();
        // wait to load the profile
        cy.wait(1000);
        // check the profile has loaded by checking the name field
        cy.get('#user-name').should('contain', 'Nate Ainsworth');

    });
    


    it.skip('check no private repos load when missing token', () => {
        // get api token from env file
        const apiToken = Cypress.env('GITHUB_API_TOKEN');

        cy.get('#github-search').type('nateainsworth');
        cy.get('#search-button').click();

        // filter by private repos from dropdown
        cy.get('#filter-button').click({force:true});
        cy.wait(100);
        cy.get('#filter-option-1').click({force:true});
        cy.wait(1000);
        // no token and so no repos should exist after filtering
        cy.get('.repo-card').should('not.exist');

    });


    it.skip('check private repos load on token input', () => {
        // get api token from env file
        const apiToken = Cypress.env('GITHUB_API_TOKEN');

        //put token into search field and enter
        cy.get('#github-search').type('nateainsworth');
        cy.get('#token-search').type( `${apiToken}`);
        cy.get('#search-button').click();
        //wait for repo refresh
        cy.wait(1000);
        
        // open the filter and change to private filter
        cy.get('#filter-button').click({force:true});
        cy.wait(100);
        cy.get('#filter-option-1').click({force:true});
        cy.wait(1000);
        cy.get('.repo-card').should('exist');

    });

    it('check repos filter by alphabetically', () => {
        // get api token from env file
        const apiToken = Cypress.env('GITHUB_API_TOKEN');

        //put token into search field and enter
        cy.get('#github-search').type('nateainsworth');
        cy.get('#token-search').type( `${apiToken}`);
        cy.get('#search-button').click();
        //wait for repo refresh
        cy.wait(1000);
        
        // open the filter and change to private filter
        cy.get('#filter-button').click({force:true});
        cy.wait(100);
        cy.get('#filter-option-3').click({force:true});
        cy.wait(1000);

        // get all titles and check alphabetically by resorting and checking they match
        cy.get('#repository-list .repo-title').then(repos => {
            const unsortedRepos = repos.map((index, html) => Cypress.$(html).text()).get();
            const sortedRepos = unsortedRepos.slice().sort((a, b) => a.localeCompare(b));
            expect(unsortedRepos, 'Repos are sorted').to.deep.equal(sortedRepos);
          });

    });

    //todo perform additional testing on the filtering
   
});
