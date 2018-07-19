const CodeScalar = require('../scalars/code.scalar');
const DateTimeScalar = require('../scalars/datetime.scalar');
const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

/**
 * @name exports
 * @summary ProcessRequest Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'ProcessRequest_Input',
	description: 'Base StructureDefinition for ProcessRequest Resource.',
	fields: () => extendSchema(require('./domainresource.input'), {
		// TODO: Make enum as this can only be one type
		resourceType: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Type of this resource'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/actionlist
		action: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'The type of processing action being requested, for example Reversal, Readjudication, StatusRequest,PendedRequest.'
		},
		_action: {
			type: require('./element.input'),
			description: 'The type of processing action being requested, for example Reversal, Readjudication, StatusRequest,PendedRequest.'
		},
		identifier: {
			type: new GraphQLList(require('./identifier.input')),
			description: 'The ProcessRequest business identifier.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/ruleset
		ruleset: {
			type: require('./coding.input'),
			description: 'The version of the style of resource contents. This should be mapped to the allowable profiles for this and supporting resources.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/ruleset
		originalRuleset: {
			type: require('./coding.input'),
			description: 'The style (standard) and version of the original material which was converted into this resource.'
		},
		created: {
			type: DateTimeScalar,
			description: 'The date when this resource was created.'
		},
		_created: {
			type: require('./element.input'),
			description: 'The date when this resource was created.'
		},
		target: {
			type: require('./reference.input'),
			description: 'The organization which is the target of the request.'
		},
		provider: {
			type: require('./reference.input'),
			description: 'The practitioner who is responsible for the action specified in thise request.'
		},
		organization: {
			type: require('./reference.input'),
			description: 'The organization which is responsible for the action speccified in thise request.'
		},
		request: {
			type: require('./reference.input'),
			description: 'Reference of resource which is the target or subject of this action.'
		},
		response: {
			type: require('./reference.input'),
			description: 'Reference of a prior response to resource which is the target or subject of this action.'
		},
		nullify: {
			type: GraphQLBoolean,
			description: 'If true remove all history excluding audit.'
		},
		_nullify: {
			type: require('./element.input'),
			description: 'If true remove all history excluding audit.'
		},
		reference: {
			type: GraphQLString,
			description: 'A reference to supply which authenticates the process.'
		},
		_reference: {
			type: require('./element.input'),
			description: 'A reference to supply which authenticates the process.'
		},
		item: {
			type: new GraphQLList(require('./processrequestitem.input')),
			description: 'List of top level items to be re-adjudicated, if none specified then the entire submission is re-adjudicated.'
		},
		include: {
			type: new GraphQLList(GraphQLString),
			description: 'Names of resource types to include.'
		},
		_include: {
			type: require('./element.input'),
			description: 'Names of resource types to include.'
		},
		exclude: {
			type: new GraphQLList(GraphQLString),
			description: 'Names of resource types to exclude.'
		},
		_exclude: {
			type: require('./element.input'),
			description: 'Names of resource types to exclude.'
		},
		period: {
			type: require('./period.input'),
			description: 'A period of time during which the fulfilling resources would have been created.'
		}
	})
});
