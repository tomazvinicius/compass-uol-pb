class PetServiceMock {
  PetUpdateRepositoryMockRequestCorrect(): any {
    return {
      name: 'Akamaru',
      species: 'dog',
      carry: 'p',
      weight: 10,
      date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
    };
  }

  delete(): any {
    return {
      _id: '64c424c75ffde056dbe3eb95',
    };
  }

  deletePet(): any {
    return {
      _id: '64c424c75ffde056dbe3eb95',
    };
  }

  deletePetError(): any {
    return {
      message: 'Unauthorized Error',
      details: 'Token Invalid',
    };
  }

  PetPostRepositoryMock(): any {
    return {
      _id: '64a32d48df2eaccf95fee709',
      name: 'Akamaru',
      species: 'dog',
      carry: 'p',
      weight: 10,
      date_of_birth: new Date('2002-01-26T00:00:00.000Z'),
    };
  }
}

export default new PetServiceMock();
