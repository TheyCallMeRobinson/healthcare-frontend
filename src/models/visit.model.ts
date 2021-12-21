import EntityModel from '@/models/entity.model';

interface Visit extends EntityModel {
	doctorId: number,
	patientId: number,
	result: string | undefined,
	recipe: string | undefined,
	dateAndTime: string,
	status: string
}

export default Visit