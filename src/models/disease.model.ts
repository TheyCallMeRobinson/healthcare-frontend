import EntityModel from '@/models/entity.model';

interface Disease extends EntityModel {
	name: string,
	startDate: string,
	endDate: string
}

export default Disease