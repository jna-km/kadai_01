<?php

namespace App\Services;

use App\Repositories\Contracts\HolidayRepositoryInterface;

class HolidayService
{
    protected HolidayRepositoryInterface $holidayRepository;

    public function __construct(HolidayRepositoryInterface $holidayRepository)
    {
        $this->holidayRepository = $holidayRepository;
    }

    public function getAll()
    {
        return $this->holidayRepository->all();
    }

    public function getById(int $id)
    {
        return $this->holidayRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->holidayRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->holidayRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->holidayRepository->delete($id);
    }
}
