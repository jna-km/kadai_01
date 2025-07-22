<?php

namespace App\Services;

use App\Repositories\Contracts\TimeSlotRepositoryInterface;

class TimeSlotService
{
    protected $timeSlotRepository;

    /**
     * @param TimeSlotRepositoryInterface $timeSlotRepository
     */
    public function __construct(TimeSlotRepositoryInterface $timeSlotRepository)
    {
        $this->timeSlotRepository = $timeSlotRepository;
    }

    public function getAll()
    {
        return $this->timeSlotRepository->all();
    }

    public function getById(int $id)
    {
        return $this->timeSlotRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->timeSlotRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->timeSlotRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->timeSlotRepository->delete($id);
    }
}
