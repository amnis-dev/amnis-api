# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.14.11](https://github.com/amnis-dev/amnis-api/compare/v0.14.10...v0.14.11) (2023-03-12)


### Features

* **Headers:** Added cross-fetch headers for browser environments ([783de5f](https://github.com/amnis-dev/amnis-api/commit/783de5f0d7d23f5241561f5919d73e0d964c06b5))

### [0.14.10](https://github.com/amnis-dev/amnis-api/compare/v0.14.9...v0.14.10) (2023-03-12)


### Features

* **Headers:** Added content type header to requests ([eead12a](https://github.com/amnis-dev/amnis-api/commit/eead12a2a53377090ca22e85938ecd981116ad3a))

### [0.14.9](https://github.com/amnis-dev/amnis-api/compare/v0.14.8...v0.14.9) (2023-03-12)


### Bug Fixes

* **Packages:** Added cross-fetch as external package ([d197747](https://github.com/amnis-dev/amnis-api/commit/d197747726130c9e13b0bc15a1df8dd23e51ca76))

### [0.14.8](https://github.com/amnis-dev/amnis-api/compare/v0.14.7...v0.14.8) (2023-03-09)


### Bug Fixes

* **Authenticate:** Fixed missing endpoint processing and query methods ([d98d722](https://github.com/amnis-dev/amnis-api/commit/d98d722c20aa772a429999187d01a4c3a8f15bc2))

### [0.14.7](https://github.com/amnis-dev/amnis-api/compare/v0.14.6...v0.14.7) (2023-03-08)


### Bug Fixes

* **Globals:** Fixed issue in browsers where global is not defined ([8ac0eac](https://github.com/amnis-dev/amnis-api/commit/8ac0eac68ffefe3b898f333724fc765ffb601437))

### [0.14.6](https://github.com/amnis-dev/amnis-api/compare/v0.14.5...v0.14.6) (2023-03-08)


### Bug Fixes

* **Deps:** Removed cross-fetch from bundle ([645746d](https://github.com/amnis-dev/amnis-api/commit/645746dc6e828df4d57d793fb88ea23e9fb8225d))

### [0.14.5](https://github.com/amnis-dev/amnis-api/compare/v0.14.4...v0.14.5) (2023-03-08)


### Bug Fixes

* **Exports:** Package now exports schema ([a738539](https://github.com/amnis-dev/amnis-api/commit/a738539d1146ba57d11c6f6988c2e4df8a46e5e3))

### [0.14.4](https://github.com/amnis-dev/amnis-api/compare/v0.14.3...v0.14.4) (2023-03-08)


### Features

* **Schema:** Api now exports schema ([a3379ea](https://github.com/amnis-dev/amnis-api/commit/a3379ea8f8b059bed982e42a3b226ec6f3e0b610))

### [0.14.3](https://github.com/amnis-dev/amnis-api/compare/v0.14.2...v0.14.3) (2023-03-08)


### Features

* **React:** Added export for react set of reducers and middleware ([9df1cd2](https://github.com/amnis-dev/amnis-api/commit/9df1cd20f7a9e8b5ae89aa6dea609f6a0d143f53))

### [0.14.2](https://github.com/amnis-dev/amnis-api/compare/v0.14.1...v0.14.2) (2023-03-08)


### Features

* **Amnis:** Bumped Amnis package versions ([e44ff3a](https://github.com/amnis-dev/amnis-api/commit/e44ff3a612f1d23e6dffd8f9ac8ea9d6fed24745))
* Completed tests ([ada8f46](https://github.com/amnis-dev/amnis-api/commit/ada8f462b71b97b2e6ce841e28d89f2cea584f6a))


### Bug Fixes

* **Auth:** Client now unsets active accounts on the state ([7eaef01](https://github.com/amnis-dev/amnis-api/commit/7eaef01fbb8ac3b01e03d6bab7c1acc5459712b3))

### [0.14.1](https://github.com/amnis-dev/amnis-api/compare/v0.14.0...v0.14.1) (2023-03-05)


### Features

* **Amnis:** Bumped Amnis State Version ([86cf456](https://github.com/amnis-dev/amnis-api/commit/86cf4566f00c38dcc24554b17353e740ea7367e7))
* **Api:** Combined processors with query apis ([4887a33](https://github.com/amnis-dev/amnis-api/commit/4887a3383bd9dadcca22946922dae2713ce3fa6f))
* **Package:** Renamed package from process to api to include queries and processors ([b452502](https://github.com/amnis-dev/amnis-api/commit/b452502080eb5ee82f71a98aa5d75d8fce86493e))
* **Tests:** Added unit tests for Auth and Crud client queries ([b744282](https://github.com/amnis-dev/amnis-api/commit/b7442823dcd96456eec194ebe8ae8be4c840444f))
* **Workflow:** Added audit job to integrity workflow ([cbfa87b](https://github.com/amnis-dev/amnis-api/commit/cbfa87b0e1b89321dd76e6134d023048ff525f06))

## 0.14.0 (2023-02-23)


### Features

* **Initial:** Setup initial project configurations ([f3f0e31](https://github.com/amnis-dev/amnis-api/commit/f3f0e31308f2af6ffe28f5fbb2a601516b1e64df))
* **apiers:** apiers structure updated to match new amnis state type ([2aa0d58](https://github.com/amnis-dev/amnis-api/commit/2aa0d58555bb556972e202c588ba756ffe063bde))
* **api:** Exports a mapped structure of HTTPS and apies ([b2b2780](https://github.com/amnis-dev/amnis-api/commit/b2b278044102ac74b206e90670f6d9ffad047415))
* **apiors:** Added apiors and middleware ([5d34540](https://github.com/amnis-dev/amnis-api/commit/5d345405a219f6f7a0793f34af7c1cddc77a3497))
* **Workflow:** Added integrity workflow ([f45ba3b](https://github.com/amnis-dev/amnis-api/commit/f45ba3be64c1e4492e6c6cb2dcda39591f8542a6))
* **Workflow:** Removed ffmpeg install from integrity workflow ([9bb2d38](https://github.com/amnis-dev/amnis-api/commit/9bb2d38078d162f91c4d060e72e1d1f87737f9bd))
* **Workflow:** Removed linked packages in workflow ([bc41be9](https://github.com/amnis-dev/amnis-api/commit/bc41be9e579f2d2facb89be106f112a11e0d9d96))


### Bug Fixes

* **Workflow:** Added unlink step to remove linked packages ([01895b8](https://github.com/amnis-dev/amnis-api/commit/01895b84c48433fb708c0892857e110011a3c751))
* **Workflow:** Fixed workflow with linked dependency ([ba2eb6f](https://github.com/amnis-dev/amnis-api/commit/ba2eb6fd07208133323fb4bb7dcdae779b3ac654))
* **Workflow:** Workflow now has default working directory ([be5f1c7](https://github.com/amnis-dev/amnis-api/commit/be5f1c76535013d3b4bcff20275baf37f5e87183))
