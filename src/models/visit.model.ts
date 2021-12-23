import EntityModel from '@/models/entity.model';

interface Visit extends EntityModel {
	doctorId: number,
	patientId: number,
	date: string,
	startTime: string,
	result: string | undefined,
	recipe: string | undefined,
}

export default Visit