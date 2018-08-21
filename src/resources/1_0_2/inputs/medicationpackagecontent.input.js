const { GraphQLInputObjectType, GraphQLNonNull } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');



/**
 * @name exports
 * @summary MedicationPackageContent Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'MedicationPackageContent_Input',
	description: 'A set of components that go to make up the described item.',
	fields: () => extendSchema(require('./backboneelement.input'), {
		item: {
			type: new GraphQLNonNull(require('./reference.input')),
			description: 'Identifies one of the items in the package.'
		},
		amount: {
			type: require('./quantity.input'),
			description: 'The amount of the product that is in the package.'
		}
	})
});
