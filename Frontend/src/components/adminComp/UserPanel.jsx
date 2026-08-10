import { useFetcher } from "react-router-dom";
import {
  MdStar,
  MdStarBorder,
  MdAdminPanelSettings,
  MdPersonOutline,
} from "react-icons/md";

function UserPanel({ data }) {
  const users = data.users || [];
  const fetcher = useFetcher();

  const isUpdating = (userId) => {
    return (
      fetcher.state !== "idle" && fetcher.formData?.get("userId") === userId
    );
  };

  return (
    <div className="w-full min-h-full p-8 flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          User Directory
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          Manage platform access, roles, and premium memberships.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden relative">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  User Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  System Roles
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Membership
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Admin Access
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No users found in the system.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const updatingThisRow = isUpdating(user._id);

                  return (
                    <tr
                      key={user._id}
                      className={`hover:bg-slate-50 transition-colors ${updatingThisRow ? "opacity-60" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">
                            {user.fullName}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            {user.email}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {user.systemRoles.map((role, idx) => (
                            <span
                              key={idx}
                              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                                role === "Seller"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-slate-100 text-slate-600 border-slate-200"
                              }`}
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <fetcher.Form
                          method="POST"
                          className="flex justify-center"
                        >
                          <input
                            type="hidden"
                            name="intent"
                            value="update_user_roles"
                          />
                          <input type="hidden" name="userId" value={user._id} />
                          <input
                            type="hidden"
                            name="membership"
                            value={(!user.membership).toString()}
                          />

                          <button
                            type="submit"
                            disabled={updatingThisRow}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                              user.membership
                                ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
                                : "bg-white text-slate-400 border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {user.membership ? (
                              <MdStar size={16} />
                            ) : (
                              <MdStarBorder size={16} />
                            )}
                            {user.membership ? "Premium" : "Standard"}
                          </button>
                        </fetcher.Form>
                      </td>

                      <td className="px-6 py-4">
                        <fetcher.Form
                          method="POST"
                          className="flex justify-center"
                        >
                          <input
                            type="hidden"
                            name="intent"
                            value="update_user_roles"
                          />
                          <input type="hidden" name="userId" value={user._id} />
                          <input
                            type="hidden"
                            name="isAdmin"
                            value={(!user.isAdmin).toString()}
                          />

                          <button
                            type="submit"
                            disabled={updatingThisRow}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                              user.isAdmin
                                ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                                : "bg-white text-slate-400 border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {user.isAdmin ? (
                              <MdAdminPanelSettings size={16} />
                            ) : (
                              <MdPersonOutline size={16} />
                            )}
                            {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                          </button>
                        </fetcher.Form>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-xs font-semibold text-slate-500">
          Showing {users.length} registered users
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
