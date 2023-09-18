class TutorServiceMock {
  TutorGetRepositoryMock(): any {
    return {
      docs: [
        {
          _id: '64a32d48df2eaccf95fee709',
          name: 'Tamisia',
          phone: '69981212317',
          email: 'tamisia@paidepet.com',
          date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
          zip_code: 61760000,
          pets: [
            {
              _id: '64a34a8ff0e6d55acba1d5b8',
              name: 'Espartano Lindo',
              species: 'cat',
              carry: 'p',
              weight: 10,
              date_of_birth: '1993-12-12 10: 10',
            },
          ],
        },
      ],
      totalDocs: 11,
      limit: 10,
      totalPages: 2,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: true,
      prevPage: null,
      nextPage: 2,
    };
  }

  TutorFindTutorOfPetRepositoryMockRequestCorrect(): any {
    return {
      _id: '64a32d48df2eaccf95fee709',
      name: 'Antonio',
      phone: '69981212317',
      email: 'antonio@paidepet.com',
      date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
      zip_code: 61760000,
      pets: [
        {
          name: 'Kon',
          species: 'dog',
          carry: 'p',
          weight: 10,
          date_of_birth: '1993-12-12 10:10',
        },
      ],
    };
  }

  post(): any {
    return {
      name: 'Guilherme',
      phone: '69981212317',
      email: 'antonio@paidepet.com',
      date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
      zip_code: 61760000,
    };
  }

  auth(): any {
    return {
      _id: '64a32d48df2eaccf95fee709',
      email: 'antonio@paidepet.com',
      password: '$2a$12$.FxRywBeU13HDnnYzg5yIetuK/H7upccT7P2vhfdNRNQircYF23wy',
    };
  }

  put(): any {
    return {
      name: 'Geovanna',
      password: '123456',
      phone: '85999323895',
      email: 'geovanna@paidepet.com',
      date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
      zip_code: 61760000,
      pets: [],
    };
  }

  delete(): any {
    return {
      _id: '64c424c75ffde056dbe3eb95',
    };
  }

  getPetsById(): any {
    return {
      _id: '64a32d48df2eaccf95fee709',
      pets: [],
    };
  }

  TutorFindTutorByIdRepositoryMock(): any {
    return {
      _id: '64a32d48df2eaccf95fee709',
    };
  }

  nullMock(): any {
    return null;
  }
}

export default new TutorServiceMock();
