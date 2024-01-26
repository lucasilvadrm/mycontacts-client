class ContactMapper {
  // recebe um objeto no formato do domain e retorna um objeto no formato da persistência
  toPersistence(domainContact) {
    return {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };
  }

  // recebe um objeto no formato da persistência e retorna um objeto no formato do domain
  toDomain(persistenceContact) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
