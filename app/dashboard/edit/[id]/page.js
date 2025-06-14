'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchWorkshopDetail, fetchTicketDetail } from '@/app/api/manage-workshop';
import CreateEventPage from '../../create-event/page';
export default function EditWorkshopPage() {
    const { id } = useParams();
    const [workshopData, setWorkshopData] = useState(null);
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const workshop = await fetchWorkshopDetail({ workshopId: id });
            const ticket = await fetchTicketDetail
                ({ workshopId: workshop?.workshopTicketInfo.workshopTicketInfoId });
            setWorkshopData(workshop);
            console.log(ticket)
            setTicketData(ticket);
        };

        loadData();
    }, [id]);
    return (
        <CreateEventPage
            mode="edit"
            initialWorkshop={workshopData}
            initialTicket={ticketData} />
    );
}
