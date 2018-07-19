const CodeScalar = require('../scalars/code.scalar');
const DateTimeScalar = require('../scalars/datetime.scalar');
const UriScalar = require('../scalars/uri.scalar');
const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

/**
 * @name exports
 * @summary DetectedIssue Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'DetectedIssue_Input',
	description: 'Base StructureDefinition for DetectedIssue Resource.',
	fields: () => extendSchema(require('./domainresource.input'), {
		// TODO: Make enum as this can only be one type
		resourceType: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Type of this resource'
		},
		patient: {
			type: require('./reference.input'),
			description: 'Indicates the patient whose record the detected issue is associated with.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/detectedissue-category
		category: {
			type: require('./codeableconcept.input'),
			description: 'Identifies the general type of issue identified.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/detectedissue-severity
		severity: {
			type: CodeScalar,
			description: 'Indicates the degree of importance associated with the identified issue based on the potential impact on the patient.'
		},
		_severity: {
			type: require('./element.input'),
			description: 'Indicates the degree of importance associated with the identified issue based on the potential impact on the patient.'
		},
		implicated: {
			type: new GraphQLList(require('./reference.input')),
			description: 'Indicates the resource representing the current activity or proposed activity that is potentially problematic.'
		},
		detail: {
			type: GraphQLString,
			description: 'A textual explanation of the detected issue.'
		},
		_detail: {
			type: require('./element.input'),
			description: 'A textual explanation of the detected issue.'
		},
		date: {
			type: DateTimeScalar,
			description: 'The date or date-time when the detected issue was initially identified.'
		},
		_date: {
			type: require('./element.input'),
			description: 'The date or date-time when the detected issue was initially identified.'
		},
		author: {
			type: require('./reference.input'),
			description: 'Individual or device responsible for the issue being raised.  For example, a decision support application or a pharmacist conducting a medication review.'
		},
		identifier: {
			type: require('./identifier.input'),
			description: 'Business identifier associated with the detected issue record.'
		},
		reference: {
			type: UriScalar,
			description: 'The literature, knowledge-base or similar reference that describes the propensity for the detected issue identified.'
		},
		_reference: {
			type: require('./element.input'),
			description: 'The literature, knowledge-base or similar reference that describes the propensity for the detected issue identified.'
		},
		mitigation: {
			type: new GraphQLList(require('./detectedissuemitigation.input')),
			description: 'Indicates an action that has been taken or is committed to to reduce or eliminate the likelihood of the risk identified by the detected issue from manifesting.  Can also reflect an observation of known mitigating factors that may reduce/eliminate the need for any action.'
		}
	})
});
