// Import Cypress and the base URL from the configuration file

let userId; // Variable to store the user ID

describe("API Test - GET /api/users?page=2", () => {
  it("should return a list of users from page 2 with required fields", () => {
    cy.request("GET", `/users?page=2`)
      .should((response) => {
        // Assert that the response status code is 200 (OK)
        expect(response.status).to.eq(200);

        // Assert that the response contains the expected data structure
        expect(response.body).to.have.property("page", 2);
        expect(response.body).to.have.property("data").to.be.an("array");
        expect(response.body.data).to.not.be.empty;

        // Assert that each user in the "data" array has the required fields
        response.body.data.forEach((user) => {
          expect(user).to.have.property("id");
          expect(user).to.have.property("email");
          expect(user).to.have.property("first_name");
          expect(user).to.have.property("last_name");

          // Assert that the user's first_name and last_name do not contain "sekar"
          const fullName = `${user.first_name} ${user.last_name}`;
          expect(fullName.toLowerCase()).to.not.include("sekar");

          // Store the user ID for later use
          userId = user.id;
        });
      });
  });

  it("should retrieve a single user by user ID from the list", () => {
    // Ensure we have a user ID from the previous test
    expect(userId).to.be.a("number");

    cy.request("GET", `/users/${userId}`)
      .should((response) => {
     
        expect(response.status).to.eq(200);

     
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("id", userId);
        expect(response.body.data).to.have.property("email");
        expect(response.body.data).to.have.property("first_name");
        expect(response.body.data).to.have.property("last_name");
      });
  });
});
