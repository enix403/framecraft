import { Link } from "react-router";

export function MyDesignCard({ name }: { name: string }) {
  return (
    <div className='card card-image-cover max-w-none'>
      <img src='/plan1.jpg' alt='' />
      <div className='card-body px-6 pt-4 pb-8'>
        <h2 className='card-header'>{name}</h2>
        <div className='flex w-full overflow-x-auto'>
          <table className='table-compact table-zebra table max-w-full'>
            <tbody>
              <tr>
                <th>Plot Dimension</th>
                <td>
                  <p className='text-right'>10 ft x 12 ft</p>
                </td>
              </tr>
              <tr>
                <th>Room Count</th>
                <td>
                  <p className='text-right'>3</p>
                </td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>
                  <p className='text-right'>August 11, 2024</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='card-footer mt-4'>
          <Link to='/edit' className='btn-secondary btn w-full'>
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
