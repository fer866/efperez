<?php

namespace App\Http\Controllers\API;

use App\Exceptions\CustomException;
use App\Http\Controllers\Controller;
use App\Jobs\SendEmailsJob;
use App\Mail\Comments;
use App\Mail\ContactMail;
use App\Models\HistoryProfile;
use Illuminate\Http\Request;
use App\Models\LikesByIP;
use App\Models\MyCollection;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ProfileController extends Controller
{
    public function getCollectionById($id) {
        $lang = App::getLocale();
        $data = DB::table('collection as c')
                    ->join('collectiontext as t', function($join) use ($lang) {
                        $join->on('c.id', '=', 't.id')->where('t.lang', $lang);
                    })
                    ->where([['c.active', true], ['c.idCol', $id]])
                    ->select('c.id', 't.lang', 't.colName', 't.description', 'c.icon', 'c.likes')
                    ->get();
        return response()->json($data, 200);
    }

    public function likeToCollection(Request $request)
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '::1';
        $id = $request['id'];
        $today = date("Y-m-d H:i:s");
        if (LikesByIP::where([['ip', $ip], ['id', $id]])->exists()) {
            throw new CustomException(__('messages.likes'));
        }
        $count = MyCollection::where('id', $id)->select('likes')->first('likes');
        $count->likes = $count->likes ? ++$count->likes : 1;
        MyCollection::where('id', $id)->update(['likes' => $count->likes]);
        LikesByIP::create(['IP' => $ip, 'ID' => $id, 'Created' => $today]);
        return response()->json();
    }

    public function getGithubRepos()
    {
        $client = new \GuzzleHttp\Client();
        $request = $client->get('https://api.github.com/users/fer866/repos');
        $response = $request->getBody();
        $data = json_decode($response);
        return response()->json($data);
    }

    public function getExperience()
    {
        $lang = App::getLocale();
        $data = DB::table('experience as e')
                    ->join('experiencetext as t', function($join) use ($lang) {
                        $join->on('e.id', '=', 't.id')->where('t.lang', $lang);
                    })
                    ->select('e.id', 't.category', 't.expName', 'e.percentage')
                    ->orderBy('t.category')->orderBy('t.expName')
                    ->get();
        $group = collect($data)->groupBy('category');
        foreach ($group as $key => $value) {
            $obj['cat'] = $key;
            $obj['items'] = $value;
            $array[] = $obj;
        }
        return response()->json($array);
    }

    public function getHistory()
    {
        $lang = App::getLocale();
        $data = HistoryProfile::from('historyprofile as h')
                        ->join('historyprofiletext as t', function($join) use ($lang) {
                        $join->on('h.id', '=', 't.id')->where('t.lang', $lang);
                        })
                        ->where('h.active', true)
                        ->select("h.id", "h.historyDate", "h.typeH", "t.title", "t.company", "t.description")
                        ->orderByDesc("h.historyDate")->orderBy("t.title")
                        ->get();
        return response()->json($data);
    }

    public function sendComments(Request $request)
    {
        $data = (object) $request->all();
        $data->lang = App::currentLocale();
        SendEmailsJob::dispatch($data);
        return response()->json(['message' => __('messages.email')]);
    }

    private function object_to_array($data)
    {
        if (is_array($data) || is_object($data))
        {
            $result = [];
            foreach ($data as $key => $value) {
                $result[$key] = (is_array($data) || is_object($data)) ? $this->object_to_array($value) : $value;
            }
            return $result;
        }
        return $data;
    }
}
