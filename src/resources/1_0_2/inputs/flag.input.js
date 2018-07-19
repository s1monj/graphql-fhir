const CodeScalar = require('../scalars/code.scalar');
const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

/**
 * @name exports
 * @summary Flag Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'Flag_Input',
	description: 'Base StructureDefinition for Flag Resource.',
	fields: () => extendSchema(require('./domainresource.input'), {
		// TODO: Make enum as this can only be one type
		resourceType: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Type of this resource'
		},
		identifier: {
			type: new GraphQLList(require('./identifier.input')),
			description: 'Identifier assigned to the flag for external use (outside the FHIR environment).'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/flag-category
		category: {
			type: require('./codeableconcept.input'),
			description: 'Allows an flag to be divided into different categories like clinical, administrative etc. Intended to be used as a means of filtering which flags are displayed to particular user or in a given context.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/flag-status
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'Supports basic workflow.'
		},
		_status: {
			type: require('./element.input'),
			description: 'Supports basic workflow.'
		},
		period: {
			type: require('./period.input'),
			description: 'The period of time from the activation of the flag to inactivation of the flag. If the flag is active, the end of the period should be unspecified.'
		},
		subject: {
			type: new GraphQLNonNull(require('./reference.input')),
			description: 'The patient, location, group , organization , or practitioner this is about record this flag is associated with.'
		},
		encounter: {
			type: require('./reference.input'),
			description: 'This alert is only relevant during the encounter.'
		},
		author: {
			type: require('./reference.input'),
			description: 'The person, organization or device that created the flag.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/flag-code
		code: {
			type: new GraphQLNonNull(require('./codeableconcept.input')),
			description: 'The coded value or textual component of the flag to display to the user.'
		}
	})
});
