/**
 * Created by evanmarchand on 1/13/15.
 */
// Schema Info for Validifying Users on Schema
/*Schema = {};

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    bio: {
        type: String,
        optional: true,
        max: 500
    },
    artistType: {
        type: String,
        optional: true,
        allowedValues: ['producer', 'vocalist', 'band', 'Recording Engineer', 'musician', 'song writer']
    },
    state: {
        type: String,
        optional: true,
        regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        optional:true
    }
});



Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional:true
    },
    createdAt: {
        type: Date,
        optional:true
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    following: {
        type: [String],
        optional: true
    },
    profileComplete: {
        type: Boolean,
        optional: true
    }
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

SimpleSchema.debug = true;
Meteor.users.attachSchema(Schema.User);
*/